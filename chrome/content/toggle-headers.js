var com_mattsch_toggleHeaders = {
    compactHeadersWasCollapsed: false,
}

com_mattsch_toggleHeaders.toggleHeadersView = function() {
    // Get the preferences mail branch...
    var mailPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("mail.");
    
    var currentHeaderSetting = mailPrefs.getIntPref("show_headers");
    
    // Switch from normal to all headers.
    if (currentHeaderSetting == 1) {
        goDoCommand('cmd_viewAllHeader');
    }
    // Switch from all to normal headers.
    else if (currentHeaderSetting == 2) {
        goDoCommand('cmd_viewNormalHeader');
    }
    
    // Handle aditional necessary behaviour if CompactHeaders is installed.
    com_mattsch_toggleHeaders.handleCompactHeader(currentHeaderSetting);    
}

// If compact headers is installed and the headers view is collapsed
// changing the headers setting has no (visual) effect.
// In that case the view has to be expanded and once normal headers
// will be viewed again it will be switched back to the collapsed view.
// (this solution only works when Thunderbird is not started with all headers shown)
com_mattsch_toggleHeaders.handleCompactHeader = function(oldHeaderSetting) {
    // Check if CompactHeaders is installed...
    var compactHeaders = document.getElementById('CompactHeader_collapsedHeaderView');
    
    if (compactHeaders != null) {
        // Somehow collapsed means the opposite:
        // collapsed = true: expanded
        // collapsed = false: collapsed
        if (!compactHeaders.collapsed) {
            // If normal headers were enabled before, just expand the headers view...
            if (oldHeaderSetting == 1) {
                org.mozdev.compactHeader.pane.coheToggleHeaderView();
                com_mattsch_toggleHeaders.compactHeadersWasCollapsed = true;
            }
            // If the headers view was collapsed and all headers enabled,
            // normal headers will be shown now which would be wrong behavior.
            // Just show expand the headers view instead.
            else if (oldHeaderSetting == 2) {
                org.mozdev.compactHeader.pane.coheToggleHeaderView();
                goDoCommand('cmd_viewAllHeader');
                com_mattsch_toggleHeaders.compactHeadersWasCollapsed = true;
            }
        }
        // Header view is expanded, but was previously collapsed.
        // This means we need to collapse it back again.
        else if (compactHeaders.collapsed && com_mattsch_toggleHeaders.compactHeadersWasCollapsed) {
            org.mozdev.compactHeader.pane.coheToggleHeaderView();
            com_mattsch_toggleHeaders.compactHeadersWasCollapsed = false;
        }    
    }
}