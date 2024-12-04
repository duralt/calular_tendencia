import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import { Button } from "/components/ui/button";

const escenarios = [
  {
    soporte: "Cerca de resistencia",
    fundingRate: "Alto (≥ 0.05%)",
    miedoAvaricia: "Avaricia extrema (≥ 75%)",
    volumen: "Alto (↑)",
    ratioLongShort: "Long dominante (> 60%)",
    openInterest: "En aumento (↑)",
    rsi: "Sobrecompra (≥ 70)",
    tendencia: "Sube",
  },
  {
    soporte: "Cerca de soporte",
    fundingRate: "Negativo (≤ -0.05%)",
    miedoAvaricia: "Miedo extremo (≤ 25%)",
    volumen: "Bajo (↓)",
    ratioLongShort: "Short dominante (> 60%)",
    openInterest: "En disminución (↓)",
    rsi: "Sobreventa (≤ 30)",
    tendencia: "Baja",
  },
];

const calcularTendencia = (valores) => {
  const coincidencias = escenarios.filter((escenario) =>
    Object.keys(valores).every((key) => escenario[key] === valores[key])
  );
  return coincidencias.length
    ? { tendencia: coincidencias[0].tendencia, confiabilidad: "Bajo" }
    : { tendencia: "Se mantiene", confiabilidad: "Bajo" };
};

const Dashboard = () => {
  const [valores, setValores] = useState({
    soporte: "",
    fundingRate: "",
    miedoAvaricia: "",
    volumen: "",
    ratioLongShort: "",
    openInterest: "",
    rsi: "",
  });
  const [resultado, setResultado] = useState({
    tendencia: "",
    confiabilidad: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const resultado = calcularTendencia(valores);
    setResultado(resultado);
  };

  const handleReset = () => {
    setValores({
      soporte: "",
      fundingRate: "",
      miedoAvaricia: "",
      volumen: "",
      ratioLongShort: "",
      openInterest: "",
      rsi: "",
    });
    setResultado({ tendencia: "", confiabilidad: "" });
  };

  const handleChange = (key, value) => {
    setValores({ ...valores, [key]: value });
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Análisis de Tendencias</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <p>Seleccione los valores para calcular la tendencia</p>
            <div className="flex flex-col space-y-4 mt-4">
              {/* Soporte/Resistencia */}
              <div className="section-title">Soporte/Resistencia</div>
              <Select onValueChange={(value) => handleChange("soporte", value)}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cerca de resistencia">
                    Cerca de resistencia
                  </SelectItem>
                  <SelectItem value="Cerca de soporte">
                    Cerca de soporte
                  </SelectItem>
                  <SelectItem value="En rango">En rango</SelectItem>
                </SelectContent>
              </Select>
              {/* Funding Rate */}
              <div className="section-title">Funding Rate</div>
              <Select
                onValueChange={(value) => handleChange("fundingRate", value)}
              >
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alto (≥ 0.05%)">Alto (≥ 0.05%)</SelectItem>
                  <SelectItem value="Negativo (≤ -0.05%)">
                    Negativo (≤ -0.05%)
                  </SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              {/* Índice de Miedo y Avaricia */}
              <div className="section-title">Índice de Miedo y Avaricia</div>
              <Select
                onValueChange={(value) =>
                  handleChange("miedoAvaricia", value)
                }
              >
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Miedo extremo (≤ 25%)">
                    Miedo extremo (≤ 25%)
                  </SelectItem>
                  <SelectItem value="Avaricia extrema (≥ 75%)">
                    Avaricia extrema (≥ 75%)
                  </SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              {/* Volumen */}
              <div className="section-title">Volumen</div>
              <Select onValueChange={(value) => handleChange("volumen", value)}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alto (↑)">Alto (↑)</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Bajo (↓)">Bajo (↓)</SelectItem>
                </SelectContent>
              </Select>
              {/* Ratio Long/Short */}
              <div className="section-title">Ratio Long/Short</div>
              <Select
                onValueChange={(value) => handleChange("ratioLongShort", value)}
              >
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Long dominante (> 60%)">
                    Long dominante (> 60%)
                  </SelectItem>
                  <SelectItem value="Short dominante (> 60%)">
                    Short dominante (> 60%)
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* Open Interest */}
              <div className="section-title">Open Interest</div>
              <Select
                onValueChange={(value) => handleChange("openInterest", value)}
              >
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En aumento (↑)">En aumento (↑)</SelectItem>
                  <SelectItem value="En disminución (↓)">
                    En disminución (↓)
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* RSI */}
              <div className="section-title">RSI</div>
              <Select onValueChange={(value) => handleChange("rsi", value)}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sobrecompra (≥ 70)">
                    Sobrecompra (≥ 70)
                  </SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Sobreventa (≤ 30)">
                    Sobreventa (≤ 30)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <Button className="button-primary" type="submit">
                Calcular Tendencia
              </Button>
              <Button
                className="button-secondary"
                type="button"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
        <div className={`footer footer-low`}>
          <p>Tendencia Detectada: {resultado.tendencia || "Sin definir"}</p>
          <p>Confiabilidad: {resultado.confiabilidad || "Sin definir"}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
