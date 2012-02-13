function toggleHeadersView() {
    
    var currentHeaderSetting = gPrefBranch.getIntPref("mail.show_headers");
    
    // normal headers
    if (currentHeaderSetting == 1)
        goDoCommand('cmd_viewAllHeader');
    // all headers
    else if (currentHeaderSetting == 2)
        goDoCommand('cmd_viewNormalHeader');
    
}