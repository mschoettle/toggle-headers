var toggleHeaders = {
    compactHeadersWasCollapsed: false,
}

toggleHeaders.toggleHeadersView = function() {
    // Get the preferences mail branch
    var mailPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("mail.");
    
    var currentHeaderSetting = mailPrefs.getIntPref("show_headers");
    
    // normal headers
    if (currentHeaderSetting == 1) {
        goDoCommand('cmd_viewAllHeader');
    }
    // all headers
    else if (currentHeaderSetting == 2) {
        goDoCommand('cmd_viewNormalHeader');
    }
    
    // additional behavior in case CompactHeader is installed
    toggleHeaders.handleCompactHeader(currentHeaderSetting);    
}

// If compact headers is installed and the headers view is collapsed
// changing the headers setting has no (visual) effect.
// In that case the view has to be expanded and once normal headers
// will be viewed again it will be switched back to the collapsed view.
// (this solution only works when Thunderbird is not started with all headers shown)
toggleHeaders.handleCompactHeader = function(oldHeaderSetting) {
    // check if CompactHeaders is installed
    var compactHeaders = document.getElementById('CompactHeader_collapsedHeaderView');
    
    if (compactHeaders != null) {
        // somehow collapsed means the opposite
        // collapsed = true: expanded
        // collapsed = false: collapsed
        if (!compactHeaders.collapsed) {
            // if normal headers were viewed just expand the headers view
            if (oldHeaderSetting == 1) {
                org.mozdev.compactHeader.pane.coheToggleHeaderView();
                toggleHeaders.compactHeadersWasCollapsed = true;
            }
            // if the headers view was collapsed during showing all headers
            // normal headers will be shown now which would be wrong behavior
            else if (oldHeaderSetting == 2) {
                org.mozdev.compactHeader.pane.coheToggleHeaderView();
                goDoCommand('cmd_viewAllHeader');
                toggleHeaders.compactHeadersWasCollapsed = true;
            }
        }
        // header view is expanded but was previously collapsed
        // so collapse them again
        else if (compactHeaders.collapsed && toggleHeaders.compactHeadersWasCollapsed) {
            org.mozdev.compactHeader.pane.coheToggleHeaderView();
            toggleHeaders.compactHeadersWasCollapsed = false;
        }    
    }
}