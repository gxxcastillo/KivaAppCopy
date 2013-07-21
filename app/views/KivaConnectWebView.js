// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: KivaConnectWebView
// ==========================================================================

KivaApp.KivaConnectWebView = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: KivaApp.MyController,
            action: 'init'
        }
    },
    
    cssClass: 'simple_page'

    ,childViews: 'content'

    ,content: M.ScrollView.design({
        childViews: 'label'
        ,label: M.LabelView.design({
            computedValue: {
                operation: function(){
                    var first = kv.phoneGap.localStorage.aes.getItem('user_account.first_name') || "Blankety";
                    var last = kv.phoneGap.localStorage.aes.getItem('user_account.last_name') || "Blank";
                    return 'Welcome back ' + first + ' ' + last + '.';
                }
            }
        })
    })

});

