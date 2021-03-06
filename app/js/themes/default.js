define([],

    function() {

        var defaultTheme = {};

        defaultTheme.hslRange = [-30, 200];

        // a theme is an object full of css definitions
        defaultTheme.getTheme = function(noteModel) {
            var isSlogan = noteModel.get('content').length < 50,
                isSlabText = Math.random() > 0.3,
                // fonts = ['"futura-pt"','"ff-meta-serif-web-pro"','Helvetica','"proxima-nova-soft"','"din-condensed-web"','"adobe-caslon-pro"'],
                backgroundImages = ['light_noise_diagonal','cubes','old_mathematics','old_mathematics_invert','graphy','squares','gridme','paper'],
                theme = {
                    fontSize            : (20 + (Math.round(Math.random() * 10))) + 'px',
                    h1__textTransform   : Math.random() > 0.7 ? 'uppercase' : 'none',
                    h1__fontWeight      : 'normal',
                    h1__fontSize        : isSlabText ? '1.2em' : this.getH1Size(noteModel),
                    h1__lineHeight      : 0.7 + (Math.round(Math.random() * 4) / 10),
                    slabText            : isSlabText,
                    h1__WebkitHyphens   : !isSlabText && Math.random() > 0.5 ? 'auto' : 'none',
                    padding             : (10 + Math.round(Math.random() * 50)) + 'px',
                    marginTop           : 0,
                    lineHeight          : Math.round(120 + (Math.random() * 40)) / 100,
                    align               : Math.round(Math.random() * 8),
                    boxShadow           : Math.random() < 0.6 ? '' : 'inset 0 0 100px rgba(0,0,0,0.2)',

                    // border width up to 5, > 5 = no border
                    border              : Math.random() > 0.8 ? Math.round(Math.random() * 20) + 'px solid' + (Math.random() > 0.5 ? ' white' : '') : ''
                },
                textAlign = Math.random();

            theme.textAlign = textAlign < 0.5 ? 'center' : (textAlign < 0.8 ? 'left' : (textAlign < 0.9 ? 'justify' : 'right' ));
            if (theme.textAlign !== 'left' && theme.textAlign !== 'justify') {
                theme.ul__listStyleType = 'none';
                theme.ul__paddingLeft = '0px';
                theme.li__paddingBottom = '0.5em';
            } else {
                theme.ul__paddingLeft = '25px';
            }
            theme.p__textAlign = textAlign < 0.8 ? 'left' : (textAlign < 0.95 ? 'justify' : 'right');
            theme.p__marginTop = (Math.round(theme.lineHeight * Number(theme.fontSize.slice(0, -2))))+'px';
            // theme.h1__lineHeight = Math.round((theme.lineHeight * 66) / 100);
            // theme = _.extend(theme, this.makeColors());
            theme = _.extend(theme, this.hslColors(theme));
            theme = _.extend(theme, this.makeFonts(theme));
            return theme;
        };

        defaultTheme.makeFonts = function(theme) {
            var hFontsSans = ['BebasNeueRegular', 'BlackoutMidnight', 'LeagueGothicRegular', 'CabinBold', 'CabinBoldItalic', 'CabinRegular'],
                hFontsSerif = ['ChunkFiveRegular', 'MuseoSlab', 'PTSerifBold', 'PTSerifRegular'],
                pFontsSans = ['CabinRegular', 'JunctionRegular'],
                pFontsSerif = ['MuseoSlab', 'PTSerifRegular'],
                headingSerif = Math.random() > 0.6,
                bodySerif = Math.random() > 0.8 ? !headingSerif : headingSerif,
                fonts = {};

            if (bodySerif) {
                fonts.fontFamily = pFontsSerif[Math.floor(Math.random()*(pFontsSerif.length))];
            } else {
                fonts.fontFamily = pFontsSans[Math.floor(Math.random()*(pFontsSans.length))];
            }
            if (headingSerif) {
                fonts.h1__fontFamily = hFontsSerif[Math.floor(Math.random()*(hFontsSerif.length))];
            } else {
                fonts.h1__fontFamily = hFontsSans[Math.floor(Math.random()*(hFontsSans.length))];
            }
            if (fonts.fontFamily == 'CabinRegular') {
                fonts.p_em__fontFamily = 'CabinItalic';
                fonts.p_em__fontStyle = 'normal';
                fonts.p_strong__fontFamily = 'CabinBold';
                fonts.p_strong__fontWeight = 'normal';
            } else if (fonts.fontFamily == 'PTSerifRegular') {
                fonts.p_em__fontFamily = 'PTSerifItalic';
                fonts.p_em__fontStyle = 'normal';
                fonts.p_strong__fontFamily = 'PTSerifBold';
                fonts.p_strong__fontWeight = 'normal';
            }
            if (fonts.h1__fontFamily == 'CabinBold') {
                fonts.h1_em__fontFamily = 'CabinBoldItalic';
                fonts.h1_em__fontStyle = 'normal';
            } else if (fonts.h1__fontFamily == 'CabinRegular') {
                fonts.h1_em__fontFamily = 'CabinItalic';
                fonts.h1_em__fontStyle = 'normal';
            } else if (fonts.h1__fontFamily == 'PTSerifRegular') {
                fonts.h1_em__fontFamily = 'PTSerifItalic';
                fonts.h1_em__fontStyle = 'normal';
            } else {
                fonts.h1_em__fontStyle = 'normal';
            }

            return fonts;
        };

        defaultTheme.hslColors = function(theme) {
            var colors      = {},
                hue         = this.getRandomHue(),
                isBgDark    = Math.random() < 0.3,
                isBgLight   = !isBgDark,
                isBgExtreme = Math.random() < (hue < 40 ? 0.8 : 0.6),
                isWhiteShadow = Math.random() < 0.1,
                isOutline   = !isWhiteShadow && Math.random() < 0.1,
                isInlaid    = !isWhiteShadow && !isOutline && Math.random() < 0.1,
                isComplementary = Math.random() < 0.4,
                isHSameAsFG = Math.random() < 0.3,
                // hue         = Math.round(Math.random() * 360),
                saturation  = 30,
                lightness   = isBgDark ? 30 : 70,
                bgData,
                fgData,
                hData,
                fgColor;

            bgData      = [hue, Math.random() > (isBgDark ? 0.4 : 0.7) ? (isBgExtreme ? 50 : 80) : 20];
            fgData      = [hue, bgData[1] == 20 ? 80 : 20];
            hData       = [hue, bgData[1] == 20 ? 80 : 20];

            if (isBgExtreme) {
                bgData.push(isBgDark ? 10 : 90);
            } else {
                bgData.push(isBgDark ? 30 : 60);
            }

            if (Math.random() < 0.5) {
                fgData.push(bgData[2] >= 50 ? 20 : 80);
            } else {
                fgData.push(isBgDark ? 90 : 10);
            }

            if (isComplementary) {
                hData[0] = fgData[0] = this.getComplementaryHue(hData[0]);
                hData[1] = 80;
                hData[2] = 40;
            } else  {
                hData.push(bgData[2] <= 20 || (bgData[1] >= 30 && bgData[2] <= 60) ? 90 : 30);
                // hData[1] = 60;
            }

            if (hData[2] == 90) {
                colors.h1__textShadow = '';
            } else if (isWhiteShadow) {
                colors.h1__textShadow = 'white 3px 3px 0';
            } else if (isOutline) {
                colors.h1__textShadow = 'white 3px 3px 0, white -3px -3px 0';
                if (Math.random() > 0.3) {
                    colors.h1__textShadow += ', white 3px 0 0, white -3px 0 0, white 0 3px 0, white 0 -3px 0';
                }
            } else if (isInlaid) {
                colors.h1__textShadow = 'white 0 1px 0';
            }

            colors.backgroundColor = this.arrayToHSL(bgData);
            colors.color = this.arrayToHSL(fgData);
            colors.a__color = this.arrayToHSL(fgData);
            colors['a:visited__color'] = this.arrayToHSL(fgData);
            colors.h1__color = this.arrayToHSL(hData);

            return colors;
        };

        defaultTheme.getH1Size = function(noteModel) {
            var headingLength = noteModel.get('content').split('\n', 1)[0].length,
                multiplier = 30,
                base = 20;
            if (headingLength > 50) {
                multiplier = 20;
                base = 15;
            }
            return (Math.round(Math.random() * multiplier + base) / 10) + 'em';
        };

        defaultTheme.getRandomHue = function() {
            var hslTotal = this.hslRange[1]-this.hslRange[0],
                rand = this.rander(Math.random()*hslTotal, 4),

                // push up towards yellow/orange
                yellowAdded = (rand + 80) % hslTotal;
            return yellowAdded + this.hslRange[0];
        };

        defaultTheme.getComplementaryHue = function(hue) {
            var hslTotal = this.hslRange[1]-this.hslRange[0];
            return ((hue - this.hslRange[0] + (hslTotal / 2)) % hslTotal) + this.hslRange[0];
        };

        defaultTheme.arrayToHSL = function(colorData) {
            return 'hsl('+colorData[0]+', '+colorData[1]+'%, '+colorData[2]+'%)';
        };

        defaultTheme.makeColors = function() {
            var colors      = {},
                isBgDark    = Math.random() < 0.3,
                isBgLight   = !isBgDark,
                saturation  = isBgDark ? 5 : 10, // tune this, up to around 50 for dull
                darkMixer   = 20,
                lightMixer  = 235,
                multiplier  = Math.round(this.rander(1, 5) * saturation),
                srcColor    = [
                    Math.round(this.rander(255, 10)),
                    Math.round(this.rander(255, 10)),
                    Math.round(this.rander(255, 10))
                ];

            // get rid of half the greens, pinks and turquoises...
            while (/*(Math.random() > 0.5 && srcColor[1] > srcColor[0] && srcColor[1] > srcColor[2]) ||*/
                (Math.random() > 0.5 && srcColor[0] > (3* srcColor[1]) && srcColor[2] > (3 * srcColor[1])) ||
                (Math.random() > 0.5 && srcColor[1] > (3* srcColor[0]) && srcColor[2] > (3 * srcColor[0]))) {
                srcColor    = [
                    Math.round(this.rander(255, 4)),
                    Math.round(this.rander(255, 4)),
                    Math.round(this.rander(255, 4))
                ];
            }

            var bgColor     = [
                    Math.round((srcColor[0] + multiplier*(isBgDark ? darkMixer : lightMixer)) / (multiplier+1)),
                    Math.round((srcColor[1] + multiplier*(isBgDark ? darkMixer : lightMixer)) / (multiplier+1)),
                    Math.round((srcColor[2] + multiplier*(isBgDark ? darkMixer : lightMixer)) / (multiplier+1))
                ],
                fgColor;

            // is the bgColor really dark/light? double check...
            isBgDark    = (bgColor[0]+bgColor[1]+bgColor[2]) / 3 < 128;
            isBgLight   = !isBgDark;

            // and now figure out the fgColor
            var isFgDark    = isBgLight && Math.random() < 0.8,
                isFgBlack   = isBgLight && !isFgDark,
                isFgLight   = isBgDark && Math.random() < 0.5,
                isFgWhite   = isBgDark && !isFgLight,
                darknessFactor = Math.round(Math.random() * 3 + 1);

            if (isFgBlack) {
                fgColor = [0, 0, 0];
            } else if (isFgWhite) {
                fgColor = [255, 255, 255];
            } else {

                fgColor = [
                    Math.round((srcColor[0] + darknessFactor*(isFgDark ? darkMixer : lightMixer)) / (darknessFactor + 1)),
                    Math.round((srcColor[1] + darknessFactor*(isFgDark ? darkMixer : lightMixer)) / (darknessFactor + 1)),
                    Math.round((srcColor[2] + darknessFactor*(isFgDark ? darkMixer : lightMixer)) / (darknessFactor + 1))
                ];
            }

            fgColor = this.arrayToRGB(fgColor);
            bgColor = this.arrayToRGB(bgColor);

            // add background to the first h1?
            if (Math.random() > 0.8) {
                colors['h1_span__color'] = bgColor;
                colors['h1_span__backgroundColor'] = Math.random() < 0.3 ? [255, 255, 255] : fgColor;
            }

            colors.bgColor = bgColor;
            colors.fgColor = fgColor;

            return colors;
        };

        defaultTheme.arrayToRGB  = function(color) {
            return 'rgb('+color[0]+','+color[1]+','+color[2]+')';
        };


        // dynamic pushes the number to the edges (i.e. 0 or max)
        // it should be 0-10
        defaultTheme.rander = function(max, dynamic) {
            var d = dynamic / 4 || 0,
                m = max || 1,
                r = Math.random(),
                t = Math.round(r),
                x = (r + t * d) / (d + 1);
            return Math.round(x * m);
        };

        return defaultTheme;

    }

);