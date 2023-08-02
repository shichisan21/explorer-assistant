import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// 環境変数の値をコンソールに表示
console.log("VITE_WWW value is:", process.env.VITE_WWW);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
    WWW: JSON.stringify(process.env.VITE_WWW), // 追加
  },
});
