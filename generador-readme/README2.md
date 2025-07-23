<style>
.calificaciones-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

.categoria {
    margin: 25px 0;
}

.categoria h4 {
    color: #333;
    border-bottom: 2px solid #e1e5e9;
    padding-bottom: 8px;
    margin-bottom: 15px;
}

.estudiante {
    display: flex;
    align-items: center;
    padding: 6px 0;
    margin: 4px 0;
    border-left: 3px solid transparent;
}

.estudiante.promocionado {
    background-color: #f0fdf4;
    border-left-color: #22c55e;
    padding-left: 8px;
}

.estudiante.regular {
    background-color: #fffbeb;
    border-left-color: #eab308;
    padding-left: 8px;
}

.estudiante.libre {
    background-color: #fef2f2;
    border-left-color: #ef4444;
    padding-left: 8px;
}

.numero {
    min-width: 25px;
    font-weight: 600;
    color: #64748b;
    margin-right: 8px;
}

.info-estudiante {
    flex: 1;
    margin-right: 15px;
}

.legajo {
    font-weight: 500;
    color: #2563eb;
}

.nombre {
    font-weight: 700;
}

.calificaciones {
    display: flex;
    gap: 3px;
    align-items: center;
}

.cal {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid rgba(0,0,0,0.1);
}

.cal.parcial {
    width: 8px;
    height: 8px;
}

.cal.verde {
    background-color: #22c55e;
    border-color: #16a34a;
}

.cal.amarillo {
    background-color: #eab308;
    border-color: #ca8a04;
}

.cal.rojo {
    background-color: #ef4444;
    border-color: #dc2626;
}

.estadisticas {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 20px;
    border-radius: 12px;
    margin: 25px 0;
    border: 1px solid #e2e8f0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-top: 15px;
}

.stat-item {
    background: white;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border: 1px solid #f1f5f9;
}

.stat-number {
    font-size: 1.8em;
    font-weight: 700;
    color: #1e40af;
}

.stat-label {
    color: #64748b;
    font-size: 0.85em;
    margin-top: 4px;
}

.leyenda {
    background: #f1f5f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #3b82f6;
}

.leyenda-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
}

.leyenda-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.leyenda-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
    .estudiante {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .info-estudiante {
        margin-right: 0;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<div class="calificaciones-container">

# 📚 Calificaciones - TUP24 Lab3 C3

<div class="estadisticas">
    <h3>📊 Estadísticas del Curso</h3>
    <div class="stats-grid">
        <div class="stat-item">
            <div class="stat-number">48</div>
            <div class="stat-label">Total</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">22</div>
            <div class="stat-label">Promocionados</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">16</div>
            <div class="stat-label">Regulares</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">10</div>
            <div class="stat-label">Libres</div>
        </div>
    </div>
</div>

<div class="leyenda">
    <h4>🎯 Leyenda de Calificaciones</h4>
    <div class="leyenda-items">
        <div class="leyenda-item">
            <span class="leyenda-color verde"></span>
            <span>Aprobado</span>
        </div>
        <div class="leyenda-item">
            <span class="leyenda-color amarillo"></span>
            <span>Recuperatorio</span>
        </div>
        <div class="leyenda-item">
            <span class="leyenda-color rojo"></span>
            <span>Desaprobado</span>
        </div>
    </div>
    <p><small>💡 Los círculos más grandes representan parciales</small></p>
</div>

<div class="categoria">
<h4>✅ Promocionados</h4>
<div class="estudiante promocionado">
    <span class="numero">1.</span>
    <div class="info-estudiante">
        <span class="legajo">58931</span> - 
        <span class="nombre">Cabrera, Lucas Nahuel</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">2.</span>
    <div class="info-estudiante">
        <span class="legajo">59022</span> - 
        <span class="nombre">Camaño Terán, Nicolás</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">3.</span>
    <div class="info-estudiante">
        <span class="legajo">58889</span> - 
        <span class="nombre">Capó, Mauricio Nicolás</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">4.</span>
    <div class="info-estudiante">
        <span class="legajo">58770</span> - 
        <span class="nombre">Carabajal, Ariadna Micael</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">5.</span>
    <div class="info-estudiante">
        <span class="legajo">59046</span> - 
        <span class="nombre">Carrizo, Angel Nahuel</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">6.</span>
    <div class="info-estudiante">
        <span class="legajo">58925</span> - 
        <span class="nombre">Castillo, Martina</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">7.</span>
    <div class="info-estudiante">
        <span class="legajo">59016</span> - 
        <span class="nombre">Catania, Franco Mauricio</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">8.</span>
    <div class="info-estudiante">
        <span class="legajo">58813</span> - 
        <span class="nombre">Cervera, Diego Octavio</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">9.</span>
    <div class="info-estudiante">
        <span class="legajo">59379</span> - 
        <span class="nombre">Charkiewicz, Carolina Est</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">10.</span>
    <div class="info-estudiante">
        <span class="legajo">59347</span> - 
        <span class="nombre">Chein, Amir Elias</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">11.</span>
    <div class="info-estudiante">
        <span class="legajo">59315</span> - 
        <span class="nombre">Chein, Santiago</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">12.</span>
    <div class="info-estudiante">
        <span class="legajo">59083</span> - 
        <span class="nombre">Cuellar, José Omar</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">13.</span>
    <div class="info-estudiante">
        <span class="legajo">59063</span> - 
        <span class="nombre">Cuevas, Matias Sebastián</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">14.</span>
    <div class="info-estudiante">
        <span class="legajo">58888</span> - 
        <span class="nombre">Diaz Gómez, Andrés Dario</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">15.</span>
    <div class="info-estudiante">
        <span class="legajo">55249</span> - 
        <span class="nombre">Fernandez, Gonzalo Tomas</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">16.</span>
    <div class="info-estudiante">
        <span class="legajo">57565</span> - 
        <span class="nombre">Heredia, Fabricio Nicolás</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">17.</span>
    <div class="info-estudiante">
        <span class="legajo">59184</span> - 
        <span class="nombre">Lucena, Matias Leandro</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">18.</span>
    <div class="info-estudiante">
        <span class="legajo">59060</span> - 
        <span class="nombre">Martinez, Maira</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">19.</span>
    <div class="info-estudiante">
        <span class="legajo">59550</span> - 
        <span class="nombre">Osores Medina, Selena Pau</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">20.</span>
    <div class="info-estudiante">
        <span class="legajo">59092</span> - 
        <span class="nombre">Perez, Luciano Damian</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">21.</span>
    <div class="info-estudiante">
        <span class="legajo">58884</span> - 
        <span class="nombre">Salazar, Agustina Ximena</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante promocionado">
    <span class="numero">22.</span>
    <div class="info-estudiante">
        <span class="legajo">58881</span> - 
        <span class="nombre">Sosa Juarez, Malena Lujan</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
</div>

<div class="categoria">
<h4>⚠️ Regulares</h4>
<div class="estudiante regular">
    <span class="numero">1.</span>
    <div class="info-estudiante">
        <span class="legajo">58771</span> - 
        <span class="nombre">Calvo Maderuelo, Carlos M</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">2.</span>
    <div class="info-estudiante">
        <span class="legajo">55839</span> - 
        <span class="nombre">Castillo, Ignacio Agustín</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">3.</span>
    <div class="info-estudiante">
        <span class="legajo">59027</span> - 
        <span class="nombre">Chaves, Gonzalo Martín</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">4.</span>
    <div class="info-estudiante">
        <span class="legajo">58768</span> - 
        <span class="nombre">Cordoba, Ignacio Leandro</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">5.</span>
    <div class="info-estudiante">
        <span class="legajo">58780</span> - 
        <span class="nombre">Coronel, Juan Carlos</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">6.</span>
    <div class="info-estudiante">
        <span class="legajo">58937</span> - 
        <span class="nombre">Coronel, Lucas Francisco</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">7.</span>
    <div class="info-estudiante">
        <span class="legajo">59019</span> - 
        <span class="nombre">Corral Garcia, Mario Maxi</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">8.</span>
    <div class="info-estudiante">
        <span class="legajo">58939</span> - 
        <span class="nombre">Cruz, Francisco Sebastian</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">9.</span>
    <div class="info-estudiante">
        <span class="legajo">59075</span> - 
        <span class="nombre">Delgado, Fabricio Tobias</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">10.</span>
    <div class="info-estudiante">
        <span class="legajo">59185</span> - 
        <span class="nombre">Diaz Ghiggia, Guillermo</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span><span class="cal rojo "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">11.</span>
    <div class="info-estudiante">
        <span class="legajo">58844</span> - 
        <span class="nombre">Diaz Gonzalez, Nahuel Ale</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal rojo "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">12.</span>
    <div class="info-estudiante">
        <span class="legajo">58763</span> - 
        <span class="nombre">Donelli, Luciano</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">13.</span>
    <div class="info-estudiante">
        <span class="legajo">59438</span> - 
        <span class="nombre">Martin, Leonardo Javier</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">14.</span>
    <div class="info-estudiante">
        <span class="legajo">55883</span> - 
        <span class="nombre">Pedraza, Leonardo Miguel</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal rojo "></span><span class="cal verde "></span><span class="cal verde parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">15.</span>
    <div class="info-estudiante">
        <span class="legajo">58905</span> - 
        <span class="nombre">Sueldo, Leandro Antonio</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal verde "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal amarillo parcial"></span>
    </div>
</div>
<div class="estudiante regular">
    <span class="numero">16.</span>
    <div class="info-estudiante">
        <span class="legajo">50792</span> - 
        <span class="nombre">Tula Nelegatti, Agustin</span>
    </div>
    <div class="calificaciones">
        <span class="cal verde "></span><span class="cal rojo "></span><span class="cal verde parcial"></span><span class="cal verde "></span><span class="cal verde "></span><span class="cal rojo parcial"></span>
    </div>
</div>
</div>

<div class="categoria">
<h4>❌ Libres</h4>
<div class="estudiante libre">
    <span class="numero">1.</span>
    <div class="info-estudiante">
        <span class="legajo">57605</span> - 
        <span class="nombre">Auad, Gerónimo</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">2.</span>
    <div class="info-estudiante">
        <span class="legajo">59204</span> - 
        <span class="nombre">Aybar, Anibal Cesar Daniel</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">3.</span>
    <div class="info-estudiante">
        <span class="legajo">59181</span> - 
        <span class="nombre">Castro, Maria Belén</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">4.</span>
    <div class="info-estudiante">
        <span class="legajo">57534</span> - 
        <span class="nombre">Delani, Luca</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">5.</span>
    <div class="info-estudiante">
        <span class="legajo">58956</span> - 
        <span class="nombre">Diaz, Viviana Lorena</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">6.</span>
    <div class="info-estudiante">
        <span class="legajo">58747</span> - 
        <span class="nombre">Diez Del Valle, Lucciano</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">7.</span>
    <div class="info-estudiante">
        <span class="legajo">55847</span> - 
        <span class="nombre">Elizondo Carreras, Lautaro</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">8.</span>
    <div class="info-estudiante">
        <span class="legajo">59183</span> - 
        <span class="nombre">Fernandez, Ignacio</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">9.</span>
    <div class="info-estudiante">
        <span class="legajo">59197</span> - 
        <span class="nombre">Peralta, Antonio Nicolás</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
<div class="estudiante libre">
    <span class="numero">10.</span>
    <div class="info-estudiante">
        <span class="legajo">59037</span> - 
        <span class="nombre">Rodriguez, Antonella Fern</span>
    </div>
    <div class="calificaciones">
        <span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span><span class="cal rojo "></span><span class="cal rojo "></span><span class="cal rojo parcial"></span>
    </div>
</div>
</div>

</div>

---

## 🎓 ¿Cómo se rinde el examen final?

Para rendir el examen, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

Esta aplicación debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar su funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### 📋 Funcionalidad requerida
1. En la esquina superior izquierda debe ir el nombre del sitio.
2. En la esquina superior derecha deben haber dos botones: "Registrar" e "Ingresar", cuando no haya ningún usuario identificado.
3. Cuando el usuario haya ingresado, en la esquina izquierda debe estar el nombre del usuario y un botón "Salir".
4. Al pulsar en el nombre del usuario, se deberá poder editar los datos del mismo.
5. El sitio debe mostrar inicialmente una lista de contactos públicos ordenados por apellido y nombre.
6. El usuario que se registre podrá agregar nuevos contactos.
7. Los usuarios, al identificarse, podrán ver sus propios contactos y los contactos públicos que estén visibles.
8. Los usuarios son propietarios de los contactos que crean, siempre podrán visualizar sus contactos, editarlos o borrarlos.
9. Los usuarios podrán hacer público o privado sus contactos mediante un botón asociado a los mismos.
10. Las altas y la edición, así como la registración y el ingreso, se deben hacer en una página separada y, al completar la misma, debe regresar a la página principal.
11. Debe existir un usuario administrador que pueda visualizar todos los contactos, ya sean públicos o privados, estén visibles o no.
12. El usuario administrador puede ocultar o mostrar los contactos públicos mediante un botón que aparece en cada contacto.
13. Los usuarios se deben guardar como contactos privados con una contraseña asociada.
14. Los usuarios no deberán aparecer en el listado de contactos.

### 👤 Los contactos deben tener:
- **Nombre y Apellido** (obligatorio)
- Empresa
- Domicilio
- Teléfonos
- **Email** (obligatorio)
- Propietario (usuario que lo creó)
- Es Público (definido por el usuario propietario)
- Es Visible (definido por el administrador)
- Contraseña (en caso de ser un usuario)