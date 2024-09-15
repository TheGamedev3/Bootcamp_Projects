
async function loadConfig(){
    
    const themer = await import("./theme.mjs");

    const hour = new Date().getHours();

    // after/during 6 PM
    if(hour >= 18){
        themer.setDarkTheme();
    }else{
        themer.setLightTheme();
    }

} loadConfig();