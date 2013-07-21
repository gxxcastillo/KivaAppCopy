// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: Login
// ==========================================================================

KivaApp.Login = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: KivaApp.LoginController
            ,action: 'init'
        }
    }
    ,cssClass: 'simple_page'
    
    ,childViews: 'content'

    ,content: M.ContainerView.design({
        childViews: 'kiva_image message pin login'
        ,kiva_image: M.ImageView.design({
            anchorLocation: M.CENTER
            ,value: 'theme/images/KIVA_LOGO_TAG_RGB.png'
            ,cssClass: 'kv_login_image'
        })
        ,message: M.LabelView.design({
            contentBinding: {
                target: KivaApp.LoginController                              
                ,property: 'message'
                ,valuePattern: '<%= message %>'
            }
  
        })
        ,pin: M.TextFieldView.design({
            inputType: M.INPUT_PASSWORD
            ,cssClass: 'login_field'
        })
        ,login: M.ButtonView.design({
            cssClass: 'kv_button'
            ,value: 'Login'
            ,events: {
                tap: {
                    target: KivaApp.LoginController
                    ,action: 'goToLoans'
                }
            }
        })

    })

});

