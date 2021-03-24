/*
 @function : asb_rules_roll
 @description : Liste les durées d'écrans selon le PREROLL ou MIDROLL 
 @params :
    - asb_jw_duration_type : Type deadbreak
*/
export function asb_rules_roll(asb_jw_duration_type) {
    var asb_jw_device = '';
    var asb_adbreak_duration = 0;
    //   Détecte le device
    var asb_jw_navigator = navigator.userAgent.toLowerCase();
    if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(asb_jw_navigator))
        asb_jw_device = 'tablet'; 
    else
    if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(asb_jw_navigator))            
        asb_jw_device = 'mobile'; 
    else 
        asb_jw_device = 'desktop';

    // Initialise le adpod maximun a envoyer 
    var asb_maxadpod_default = 40;                        
    const asb_break_desktop = {
        P60_300: '40', P300_900: '63', 'P900': '84',  // PREROLL                                                    
        'M900': '147' // MIDROLL
    };
    const asb_break_mobile = {
        P60_300: '40', P300_900: '44', 'P900': '63', // PREROLL                                                    
        'M900': '126' // MIDROLL
    };

    // Envoie en fct du device
    switch(asb_jw_device) {
        case 'desktop': 
            console.log(asb_jw_device+' - '+asb_jw_duration_type+' : ');
            asb_adbreak_duration = asb_break_desktop[asb_jw_duration_type];
            break;
        case 'tablet':                                   
            console.log(asb_jw_device+' - '+asb_jw_duration_type+' : ');
            asb_adbreak_duration = asb_break_desktop[asb_jw_duration_type];
            break;
        case 'mobile':
           console.log(asb_jw_device+' - '+asb_jw_duration_type+' : ');
            asb_adbreak_duration = asb_break_mobile[asb_jw_duration_type];
            break;
        default :
            asb_adbreak_duration = asb_maxadpod_default;       
        break;                
    }       
    
    console.log('Device: '+asb_jw_device+' - Duration: '+asb_adbreak_duration+' - Type Duration :'+asb_jw_duration_type);
    return asb_adbreak_duration;
} 
// end function ad-roll

/*
 @function : asb_smart_player
 @description : Smart AdManager : gestion des PREROLLs et MIDROLLs
 @params :
    - asb_player_name : Nom du player
    - sm_site_id : Identifiant du site sur SMART
    - sm_page_id : Identifiant de la page sur SMART
*/
export function asb_smart_player_default(asb_player_name, sm_page_id) {
    window.sas.video.register({
        id: asb_player_name,
        adData: {
            sas_siteid: '299263', // '43791',
            sas_pageid: sm_page_id, // '570478',
            sas_format_linears: '43791', // '29117',
            sas_format_overlays: 43792,
            sas_networkid: 2044
        },
        adRules: [
                {
                    duration_min: 0,
                    duration_max: 60,
                    data: {
                        prerolls: { instances: 0, maxAdPodDuration: 0 }
                    }
                },
                {
                    duration_min: 60,
                    duration_max: 300,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P60_300')
                        }
                    }
                },
                {
                    duration_min: 300,
                    duration_max: 900,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P300_900')
                        }
                    }
                },
                {
                    duration_min: 900,
                    duration_max: 2400,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P900')
                        },
                        midrolls: {
                            instances: 5,
                            maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                            offset: null,
                            timecodes: ['08:00']
                        }
                    }
                },
                {
                    duration_min: 2400,
                    duration_max: 3600,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P900')
                        },
                        midrolls: {
                            instances: 5,
                            maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                            interval: null,
                            offset: 480, 
                            timecodes: ['00:08:00', '00:20:00', '00:35:00' ]
                        }
                    }
                },
                {
                    duration_min: 3600,
                    duration_max: 5400,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P900')
                        },
                        midrolls: {
                            instances: 5,
                            maxAdPodDuration: asb_rules_roll('M900'), // Sec. en fct du device
                            offset: null,
                            timecodes: ['00:10:00', '00:25:00', '00:45:00' ]
                        }
                    }
                },
                {
                    duration_min: 5400,
                    duration_max: null,
                    data: {
                        prerolls: {
                            instances: 3,
                            maxAdPodDuration: asb_rules_roll('P900')
                        },
                        midrolls: {
                            instances: 5,
                            maxAdPodDuration: asb_rules_roll('M900'),
                            interval: null,
                            offset: null,
                            timecodes: ['00:10:00', '00:25:00', '00:45:00', '01:00:00']
                        }
                    }
                }
        ],
        configuration: {
                labels: {
                    lbl_countdown_skip: { EN: 'Vous pouvez ignorer cette annonce dans {0} secondes' },
                    lbl_countdown_break_preroll: { EN: 'La vidéo débutera dans quelques secondes' },
                    lbl_countdown_break_midroll: { EN: 'La vidéo débutera dans quelques secondes' },
                    lbl_countdown_break_postroll: { EN: 'Vous pouvez maintenant ignorer cette annonce interactive dans {0} secondes' },
                    lbl_skip_vpaid: { EN: 'Vous pouvez maintenant ignorer cette annonce' },
                    lbl_more: { EN: 'En savoir plus...' }
                },                                        
                player: {
                    autoHideControls: false,
                    controlBarMode: "CONTROL_BAR_MODE_STACKED",
                    enableCountdownSkip: true,
                    enableCountdownVideo: true,
                    enableFullscreen: true,
                    enablePause: true,
                    enableSound: true,
                    scaleMode: "SCALE_MODE_ZOOM"
                },
                publisher: {
                    activeControlsForEmbededAdManager: true,
                    allowConditionalAd: true,
                    checkUniversalAdId: false,
                    countdownTimeFormat: "mm:ss",
                    enableAdPauseOnWindowChange: true,
                    enableMobileClickThroughButton: false,
                    forceSkipDelay: false,
                    html5SeamlessFullscreen: true,
                    integralAdScienceAnId: "-1",
                    muteAdsAtStartup: false,
                    numberOfPassbackAds: "-1",
                    numMaxRedirect: "7",
                    pauseMainContentUntilVASTIsLoaded: true,
                    replayAd: true,
                    requestTimeout: "3",
                    skipDelay: "20",
                    totalTimeout: "8",
                    unmuteOnMouseOver: false,
                    visibilityThresholdForPlayback: "60",
                    visibilityThresholdForUnmute: "-1"
                },
                rtb: {
                    vdmin: "",
                    vdmax: "",
                    vbrmin: "",
                    vbrmax: "",
                    vpmt: "",
                    pgDomain: ""
                },
                vpaid: {
                    enableCountdownVideo: false,
                    enableSkip: false,
                    enableSkipLabel: false,
                    generalTimeout: 3,
                    handleSkipOffset: false,
                    initTimeout: 3,
                    loadTimeout: 3,
                    totalTimeout: 0
                }                
        }
    });
}

/*
 @function : asb_smart_player_postroll
 @description : Smart AdManager : gestion des PREROLLs, MIDROLLs et POSTROLL pour les espaces dÃ©diÃ©s
 @params :
    - asb_player_name : Nom du player
    - sm_site_id : Identifiant du site sur SMART
    - sm_page_id : Identifiant de la page sur SMART
*/
export function asb_smart_player_postroll(asb_player_name, sm_page_id) {
    window.sas.video.register({
        id: asb_player_name,
        adData: {
            sas_siteid: '299263',
            sas_pageid: sm_page_id, 
            sas_format_linears: '43791', // '29117',
            sas_format_overlays: 43792,
            sas_networkid: 2044
        },
        adRules: [
            {
                duration_min: 0,
                duration_max: 60,
                data: {
                    prerolls: { instances: 0, maxAdPodDuration: 0 }
                }
            },
            {
                duration_min: 60,
                duration_max: 300,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P60_300')
                    },
                    postrolls : {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P60_300')
                    }
                }
            },
            {
                duration_min: 300,
                duration_max: 900,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P300_900')
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P300_900')
                    }
                }
            },
            {
                duration_min: 900,
                duration_max: 2400,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                        offset: null,
                        timecodes: ['08:00']
                    },
                    postrolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 2400,
                duration_max: 3600,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                        interval: null,
                        offset: 480, 
                        timecodes: ['00:08:00', '00:20:00', '00:35:00' ]
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 3600,
                duration_max: 5400,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'), // Sec. en fct du device
                        offset: null,
                        timecodes: ['00:10:00', '00:25:00', '00:45:00' ]
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 5400,
                duration_max: null,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),
                        interval: null,
                        offset: null,
                        timecodes: ['00:10:00', '00:25:00', '00:45:00', '01:00:00']
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            }
        ],
        configuration: {
            labels: {
                lbl_countdown_skip: { EN: 'Vous pouvez ignorer cette annonce dans {0} secondes' },
                lbl_countdown_break_preroll: { EN: 'La vidéo débutera dans quelques secondes' },
                lbl_countdown_break_midroll: { EN: 'La vidéo débutera dans quelques secondes' },
                lbl_countdown_break_postroll: { EN: 'Vous pouvez maintenant ignorer cette annonce interactive dans {0} secondes' },
                lbl_skip_vpaid: { EN: 'Vous pouvez maintenant ignorer cette annonce' },
                lbl_more: { EN: 'En savoir plus...' }
            },                                        
            player: {
                autoHideControls: false,
                controlBarMode: "CONTROL_BAR_MODE_STACKED",
                enableCountdownSkip: true,
                enableCountdownVideo: true,
                enableFullscreen: true,
                enablePause: true,
                enableSound: true,
                scaleMode: "SCALE_MODE_ZOOM"
            },
            publisher: {
                activeControlsForEmbededAdManager: true,
                allowConditionalAd: true,
                checkUniversalAdId: false,
                countdownTimeFormat: "mm:ss",
                enableAdPauseOnWindowChange: true,
                enableMobileClickThroughButton: false,
                forceSkipDelay: false,
                html5SeamlessFullscreen: true,
                integralAdScienceAnId: "-1",
                muteAdsAtStartup: false,
                numberOfPassbackAds: "-1",
                numMaxRedirect: "7",
                pauseMainContentUntilVASTIsLoaded: true,
                replayAd: true,
                requestTimeout: "3",
                skipDelay: "20",
                totalTimeout: "8",
                unmuteOnMouseOver: false,
                visibilityThresholdForPlayback: "60",
                visibilityThresholdForUnmute: "-1"
            },
            rtb: {
                vdmin: "",
                vdmax: "",
                vbrmin: "",
                vbrmax: "",
                vpmt: "",
                pgDomain: ""
            },
            vpaid: {
                enableCountdownVideo: false,
                enableSkip: false,
                enableSkipLabel: false,
                generalTimeout: 3,
                handleSkipOffset: false,
                initTimeout: 3,
                loadTimeout: 3,
                totalTimeout: 0
            }                              
        }
    });
}

/*
 @function : asb_smart_player_direct
 @description : Smart AdManager : gestion des PREROLLs pour le DIRECT
 @params :
    - asb_player_name : Nom du player
    - sm_page_id : Identifiant de la page sur SMART
*/
export function asb_smart_player_direct(asb_player_name, sm_page_id) {
    window.sas.video.register({
        id: asb_player_name,
        adData: {
            sas_siteid: '299263',
            sas_pageid: sm_page_id, 
            sas_format_linears: '43791', // '29117',
            sas_format_overlays: 43792,
            sas_networkid: 2044
        },
        adRules: [
            {
                duration_min: 0,
                duration_max: 300,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P60_300')
                    },
                    postrolls : {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P60_300')
                    }
                }
            },
            {
                duration_min: 300,
                duration_max: 900,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P300_900')
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P300_900')
                    }
                }
            },
            {
                duration_min: 900,
                duration_max: 2400,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                        offset: null,
                        timecodes: ['08:00']
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 2400,
                duration_max: 3600,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),  // Sec. en fct du device
                        interval: null,
                        offset: 480, 
                        timecodes: ['00:08:00', '00:20:00', '00:35:00' ]
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 3600,
                duration_max: 5400,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'), // Sec. en fct du device
                        offset: null,
                        timecodes: ['00:10:00', '00:25:00', '00:45:00' ]
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            },
            {
                duration_min: 5400,
                duration_max: null,
                data: {
                    prerolls: {
                        instances: 3,
                        maxAdPodDuration: asb_rules_roll('P900')
                    },
                    midrolls: {
                        instances: 5,
                        maxAdPodDuration: asb_rules_roll('M900'),
                        interval: null,
                        offset: null,
                        timecodes: ['00:10:00', '00:25:00', '00:45:00', '01:00:00']
                    },
                    postrolls: {
                        instances: 2,
                        maxAdPodDuration: asb_rules_roll('P900')
                    }
                }
            }
        ],
        configuration: {
            labels: {
                lbl_countdown_skip: { EN: 'Vous pouvez ignorer cette annonce dans {0} secondes' },
                lbl_countdown_break_preroll: { EN: 'La vidéo débutera dans quelques secondes' },
                lbl_countdown_break_midroll: { EN: 'La vidéo débutera dans quelques secondes' },
                lbl_countdown_break_postroll: { EN: 'Vous pouvez maintenant ignorer cette annonce interactive dans {0} secondes' },
                lbl_skip_vpaid: { EN: 'Vous pouvez maintenant ignorer cette annonce' },
                lbl_more: { EN: 'En savoir plus...' }
            },                                        
            player: {
                autoHideControls: false,
                controlBarMode: "CONTROL_BAR_MODE_STACKED",
                enableCountdownSkip: true,
                enableCountdownVideo: true,
                enableFullscreen: true,
                enablePause: true,
                enableSound: true,
                scaleMode: "SCALE_MODE_ZOOM"
            },
            publisher: {
                activeControlsForEmbededAdManager: true,
                allowConditionalAd: true,
                checkUniversalAdId: false,
                countdownTimeFormat: "mm:ss",
                enableAdPauseOnWindowChange: true,
                enableMobileClickThroughButton: false,
                forceSkipDelay: false,
                html5SeamlessFullscreen: true,
                integralAdScienceAnId: "-1",
                muteAdsAtStartup: false,
                numberOfPassbackAds: "-1",
                numMaxRedirect: "7",
                pauseMainContentUntilVASTIsLoaded: true,
                replayAd: true,
                requestTimeout: "3",
                skipDelay: "20",
                totalTimeout: "8",
                unmuteOnMouseOver: false,
                visibilityThresholdForPlayback: "60",
                visibilityThresholdForUnmute: "-1"
            },
            rtb: {
                vdmin: "",
                vdmax: "",
                vbrmin: "",
                vbrmax: "",
                vpmt: "",
                pgDomain: ""
            },
            vpaid: {
                enableCountdownVideo: false,
                enableSkip: false,
                enableSkipLabel: false,
                generalTimeout: 3,
                handleSkipOffset: false,
                initTimeout: 3,
                loadTimeout: 3,
                totalTimeout: 0
            }                
        }
    });
}
