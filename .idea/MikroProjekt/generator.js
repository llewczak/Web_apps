const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const cvLink = document.getElementById("cvLink");
const linkedInLink = document.getElementById("linkedInLink");
const college = document.getElementById("college");
const buttonGenerate = document.getElementById("qrCodeGenerate");
const buttonDownload = document.getElementById("qrCodeDownload");
const image = document.getElementById("generatedQRCode");

let lastDataUrl = "";

buttonGenerate.addEventListener("click", async () => {
    const formatedString = `Imię: ${firstName.value}\nNazwisko: ${lastName.value}\nE-mail: ${email.value}\nCV link: ${cvLink.value}\nLinkedIn: ${linkedInLink.value}\ncollege: ${college.value}`;
    const imageSource = await QRCode.toDataURL(formatedString);
    lastDataUrl = imageSource;
    image.src = imageSource;
    buttonDownload.style.display = "inline-block";
});

buttonDownload.addEventListener("click", () => {
    if (!lastDataUrl) return;

    const link = document.createElement("a");
    link.href = lastDataUrl;
    link.download = "TwojQRCode.png"; // nazwa pliku
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});