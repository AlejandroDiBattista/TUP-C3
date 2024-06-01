const Iconos = (iconos) => {
    console.log("Valor de iconos:", iconos);
    switch (iconos) {
        case 'Thunderstorm' :
        iconos = 'iconos/thunderstorms.svg'
        console.log ('tormenta')
        break;

        case 'Clear' :
        iconos = 'iconos/clear-day.svg'
        console.log ('limpio')
        break;
        
        case 'Drizzle' :
        iconos = 'iconos/drizzle.svg'
        console.log ('llovizna')
        break;

        case 'Fog' :
        iconos = 'iconos/fog.svg'
        console.log ('nube')
        break;

        case 'Haze' :
        iconos = 'iconos/haze.svg'
        console.log ('brumas')
        break;


        case 'Rain' :
        iconos = 'iconos/rain.svg'
        console.log ('lluvia')
        break;


        case 'Smoke' :
        iconos = 'iconos/smoke.svg'
        console.log ('humo')
        break;

        case 'Snow' :
        iconos = 'iconos/snow.svg'
        console.log ('nieve')
        break;

        case 'Clouds' :
            iconos = 'iconos/cloudy.svg'
            console.log ('lluvia')
            break;


    } 
    return iconos
}

export default Iconos