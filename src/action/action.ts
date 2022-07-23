import { requestBackground } from "../common/request";

window.onload = () => {
  console.log("これはactionページです。");
  document
    .getElementById("send_to_bk_btn")
    ?.addEventListener("click", async () => {
      const responce = await requestBackground(
        "REQUEST_ID_ACTION1",
        "Hello background"
      );

      alert("バックグラウンドからのメッセージ\n" + responce.data);
    });
};
