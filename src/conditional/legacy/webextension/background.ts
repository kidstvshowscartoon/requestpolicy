/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * RequestPolicy - A Firefox extension for control over cross-site requests.
 * Copyright (c) 2017 Martin Kimmerle
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * ***** END LICENSE BLOCK *****
 */

import {
  WebextSideSettingsMigrationController,
} from "controllers/webext-side-settings-migration-controller";
import { Log } from "models/log";
import { EweModule } from "app/ewe.module";
import { Connection } from "lib/classes/connection";
import { C } from "data/constants";

const log = Log.instance;
const pLegacyPort = browser.runtime.connect();
const legacyConnection = new Connection(
    C.EWE_CONNECTION_EWE_ID,
    log,
    C.EWE_CONNECTION_LEGACY_ID,
    Promise.resolve(pLegacyPort),
);
const settingsMigration = new WebextSideSettingsMigrationController(
    log, legacyConnection, browser.storage,
);
const ewe = new EweModule(log, legacyConnection, settingsMigration);

log.log("Embedded WebExtension is being loaded.");
ewe.startup();

window.addEventListener("unload", () => {
  // Only synchronous tasks can be done here.
  log.log("Embedded WebExtension is being unloaded.");
  ewe.shutdown();
});
