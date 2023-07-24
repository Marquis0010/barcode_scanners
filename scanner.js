const database = {
  1234567890123: 10.99,
  1231231231232: 90.49,
  4567891234567: 4.79,
};

function initQuagga() {
  const scannerContainer = document.getElementById("scanner-container");

  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerContainer,
        constraints: {
          facingMode: "environment",
        },
      },
      decoder: {
        readers: ["ean_reader"],
      },
    },
    function (err) {
      if (err) {
        console.error("Error initializing Quagga:", err);
        return;
      }
      Quagga.start();
    }
  );

  Quagga.onDetected((result) => {
    const barcode = result.codeResult.code;
    if (database.hasOwnProperty(barcode)) {
      const price = database[barcode];
      showResult(
        `Barcode: ${barcode}<br>Price of Product: $${price.toFixed(2)}`
      );
    } else {
      showResult(`Barcode: ${barcode}<br>Product not found in the database.`);
    }
  });
}

function showResult(content) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = content;
}

window.addEventListener("DOMContentLoaded", initQuagga);
