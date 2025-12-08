const iconMapping = {
    clear_day: 'clear-day.svg',
    clear_night: 'clear-night.svg',
    clouds: 'cloudy.svg',
    overcast: 'overcast.svg',
    overcast_day: 'overcast-day.svg',
    overcast_night: 'overcast-night.svg',
    drizzle: 'drizzle.svg',
    hail: 'hail.svg',
    rain: 'rain.svg',
    sleet: 'sleet.svg',
    smoke: 'smoke.svg',
    snow: 'snow.svg',
    partly_cloudy_day: 'partly-cloudy-day.svg',
    partly_cloudy_day_drizzle: 'partly-cloudy-day-drizzle.svg',
    partly_cloudy_day_hail: 'partly-cloudy-day-hail.svg',
    partly_cloudy_day_rain: 'partly-cloudy-day-rain.svg',
    partly_cloudy_day_sleet: 'partly-cloudy-day-sleet.svg',
    partly_cloudy_day_smoke: 'partly-cloudy-day-smoke.svg',
    partly_cloudy_day_snow: 'partly-cloudy-day-snow.svg',
    partly_cloudy_night: 'partly-cloudy-night.svg',
    partly_cloudy_night_drizzle: 'partly-cloudy-night-drizzle.svg',
    partly_cloudy_night_hail: 'partly-cloudy-night-hail.svg',
    partly_cloudy_night_rain: 'partly-cloudy-night-rain.svg',
    partly_cloudy_night_sleet: 'partly-cloudy-night-sleet.svg',
    partly_cloudy_night_smoke: 'partly-cloudy-night-smoke.svg',
    partly_cloudy_night_snow: 'partly-cloudy-night-snow.svg',
    mist: 'mist.svg',
    hurricane: 'hurricane.svg',
    tornado: 'tornado.svg',
    wind: 'wind.svg',
    dust: 'dust.svg',
    dust_day: 'dust-day.svg',
    dust_night: 'dust-night.svg',
    dust_wind: 'dust-wind.svg',
    thunderstorms: 'thunderstorms.svg',
    thunderstorms_day: 'thunderstorms-day.svg',
    thunderstorms_night: 'thunderstorms-night.svg',
    thunderstorms_rain: 'thunderstorms-rain.svg',
    thunderstorms_day_rain: 'thunderstorms-day-rain.svg',
    thunderstorms_night_rain: 'thunderstorms-night-rain.svg',
    thunderstorms_snow: 'thunderstorms-snow.svg',
    thunderstorms_day_snow: 'thunderstorms-day-snow.svg',
    thunderstorms_night_snow: 'thunderstorms-night-snow.svg',
    fog: 'fog.svg',
    fog_day: 'fog-day.svg',
    fog_night: 'fog-night.svg',
    partly_cloudy_day_fog: 'partly-cloudy-day-fog.svg',
    partly_cloudy_night_fog: 'partly-cloudy-night-fog.svg',
    haze: 'haze.svg',
    haze_day: 'haze-day.svg',
    haze_night: 'haze-night.svg',
    partly_cloudy_day_haze: 'partly-cloudy-day-haze.svg',
    partly_cloudy_night_haze: 'partly-cloudy-night-haze.svg'
  };

  function Weather({ data }) {
    const { name, main: { temp, temp_min, temp_max, humidity }, weather } = data;
    const weatherType = weather[0].main.toLowerCase();

    const iconName = iconMapping[weatherType] || 'clear-day.svg';
    const iconUrl = `./icons/${iconName}`;

    return (
        <>
            <article>
                <header>
                    {name}
                </header>
                    <img src={iconUrl} alt={weather[0].description} />
                <footer>
                    <h3>Temperatura: {temp.toFixed(2)}°C</h3>
                    <p>Minima: {temp_min.toFixed(2)}°C / Maxima: {temp_max.toFixed(2)}</p>
                    <p>Humedad: {humidity}</p>
                </footer>
            </article>
        </>
    );
  }