const InformacionAdicional = ({ velocidadViento, presion }) => {
    return (
        <div className="additionalInfo">
            <p>Viento: {velocidadViento} m/s</p>
            <p>Presión: {presion} hPa</p>
        </div>
    );
};
