import { app } from "./app";
import "./jobs/syncPlayersJob";

app.listen(4000, () => {
  console.log("🚀 Server running on port 4000");
});
