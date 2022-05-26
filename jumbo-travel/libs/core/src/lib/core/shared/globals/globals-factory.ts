import { DevGlobals } from "@jumbo/core";
import { ProdGlobals } from "@jumbo/core";
import { environment } from "../../../environments/environment";

export function globalsFactory() {
  return environment.production ? ProdGlobals : DevGlobals;
}
