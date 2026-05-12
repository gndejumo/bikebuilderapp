# bikebuilderapp
Method          Endpoint                Purpose
POST        /api/auth/register          Register user
POST        /api/auth/login             Login user      
GET         /api/users/:id              Get user profile                                        
GET         /api/bikes                  Get all bikes
GET         /api/parts                  Get all parts 
POST        /api/builds                 Create a build
GET         /api/builds/:id             Get a build
POST        /api/orders                 Place an order
GET         /api/admin                  Admin dashboard 

<!-- TO FADE PARAMETER NOT USE -->

{
    "liveServer.settings.donotShowInfoMsg": true,
    "workbench.editor.empty.hint": "hidden",
    "workbench.editorAssociations": {
        "*.copilotmd": "vscode.markdown.preview.editor",
        "*.sqlite3": "default"
    },
    "workbench.colorTheme": "One Dark Pro Mix",
    "workbench.iconTheme": "vscode-icons",

    // ✅ Editor suggestions + autocomplete
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": false
    },

    // ✅ Snippets / emmet improvements
    "editor.snippetSuggestions": "top",
    "emmet.showSuggestionsAsSnippets": true,
    "emmet.triggerExpansionOnTab": true,

    // ✅ React / JSX support
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },

    // ✅ Auto close tags
    "editor.autoClosingTags": "always",

    // ✅ Unused parameter fading
    "editor.showUnused": true,
    "editor.semanticHighlighting.enabled": true,
    "[javascript]": {
        "editor.semanticHighlighting.enabled": true
    },
    "[javascriptreact]": {
        "editor.semanticHighlighting.enabled": true
    },

    // ✅ JS type checking (enables unused param fading)
    "javascript.validate.enable": true,
    "js/ts.implicitProjectConfig.checkJs": true,

    // ✅ Hide JS/TS suggestions & warnings
    "js/ts.suggestionActions.enabled": false,

    // Copilot (unchanged)
    "github.copilot.nextEditSuggestions.fixes": false,
    "github.copilot.enable": {
        "*": false
    },
    "editor.wordWrap": "on",
    "editor.mouseWheelZoom": true
}

What I added:

"javascript.validate.enable": true — enables JS error checking
"js/ts.implicitProjectConfig.checkJs": true — enables unused param detection without needing a jsconfig.json