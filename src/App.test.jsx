import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("./lib/supabaseClient", () => ({
  supabase: {
    from: () => ({
      // 初回読み込み（useEffect）
      select: async () => ({ data: [], error: null }),

      // 追加（insert(...).select()）
      insert: (rows) => ({
        select: async () => ({ data: rows, error: null }),
      }),

      // 削除（delete().eq(...)）
      delete: () => ({
        eq: () => ({ data: [], error: null }),
      }),
    }),
  },
}));

// ① タイトルが表示されていること
test("タイトルが表示されていること", async () => {
  render(<App />);

  // 最初は Loading... が出ている
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Supabase からの読み込みが終わってタイトルが出るまで待つ
  const title = await screen.findByText("学習記録一覧");
  expect(title).toBeInTheDocument();
});

// ② フォームに入力して登録すると記録が追加されること
test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている", async () => {
  const user = userEvent.setup();

  render(<App />);

  // 初回ロード完了を待つ
  await screen.findByText("学習記録一覧");

  // フォーム要素を取得
  const titleInput = screen.getByRole("textbox");       // 学習内容
  const timeInput = screen.getByRole("spinbutton");     // 学習時間 (type="number")
  const registerButton = screen.getByRole("button", { name: "登録" });

  // 入力
  await user.type(titleInput, "React");
  await user.type(timeInput, "2");

  // 登録ボタンをクリック
  await user.click(registerButton);

  // リストに「React 2時間」が表示されていること
  expect(await screen.findByText("React 2時間")).toBeInTheDocument();
});

test("削除ボタンを押すと学習記録が削除される", async () => {
  const user = userEvent.setup();

  render(<App />);

  // ローディング終了を待つ
  await screen.findByText("学習記録一覧");

  // まず1件登録する（既存テストと同じ流れ）
  const titleInput = screen.getByRole("textbox");
  const timeInput = screen.getByRole("spinbutton");
  const registerButton = screen.getByRole("button", { name: "登録" });

  await user.type(titleInput, "React");
  await user.type(timeInput, "2");
  await user.click(registerButton);

  // 「React 2時間」が表示されていることを確認
  const item = await screen.findByText("React 2時間");
  expect(item).toBeInTheDocument();

  // その行の「削除」ボタンを押す
  const deleteButtons = screen.getAllByRole("button", { name: "削除" });
  await user.click(deleteButtons[0]);

  // 「React 2時間」が画面から消えていることを確認
  expect(screen.queryByText("React 2時間")).toBeNull();
});

test("入力をしないで登録を押すとエラーが表示される", async () => {
  const user = userEvent.setup();

  render(<App />);

  // ローディング終了を待つ
  await screen.findByText("学習記録一覧");

  // 何も入力せずに登録ボタンだけ押す
  const registerButton = screen.getByRole("button", { name: "登録" });
  await user.click(registerButton);

  // エラーメッセージが表示されることを確認
  expect(
    screen.getByText("入力内容が不足しているか、間違っています。")
  ).toBeInTheDocument();
});