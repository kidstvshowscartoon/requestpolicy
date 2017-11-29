(function() {
  // We use window.top because the popup can be embedded in a frame
  let overlay = window.top.rpcontinued.overlay;
  let $id = document.getElementById.bind(document);

  $id("rpc-revoke-temporary-permissions").addEventListener("click",
      overlay.revokeTemporaryPermissions, false);

  // Listeners for the footer links
  $id("rpc-link-enable-blocking").addEventListener("click",
      overlay.toggleTemporarilyAllowAll, false);

  $id("rpc-link-disable-blocking").addEventListener("click",
      overlay.toggleTemporarilyAllowAll, false);

  $id("rpc-link-help").addEventListener("click",
      overlay.openHelp, false);

  $id("rpc-link-prefs").addEventListener("click",
      overlay.openPrefs, false);

  $id("rpc-link-policies").addEventListener("click",
      overlay.openPolicyManager, false);

  $id("rpc-link-request-log").addEventListener("click",
      overlay.toggleRequestLog, false);
})();
