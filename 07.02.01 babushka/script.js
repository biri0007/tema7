        const header = document.querySelector("header h2");
        const medieurl = "https://babushka-dd8a.restdb.io/media/";
        const myHeaders = {

            "x-apikey": "600ec2fb1346a1524ff12de4"

        }

        document.addEventListener("DOMContentLoaded", start);

        document.querySelector("#tilmenu").addEventListener("click", tilMenu);

        function tilMenu() {
            console.log("tilMenu");
        }


        document.querySelector("nav button:nth-child(1)").addEventListener("mouseover", hoverColor);
        document.querySelector("nav button:nth-child(1)").addEventListener("mouseout", hoverColorOff);

        document.querySelector("nav button:nth-child(2)").addEventListener("mouseover", hoverColor);
        document.querySelector("nav button:nth-child(2)").addEventListener("mouseout", hoverColorOff);

        document.querySelector("nav button:nth-child(3)").addEventListener("mouseover", hoverColor);
        document.querySelector("nav button:nth-child(3)").addEventListener("mouseout", hoverColorOff);

        document.querySelector("nav button:nth-child(4)").addEventListener("mouseover", hoverColor);
        document.querySelector("nav button:nth-child(4)").addEventListener("mouseout", hoverColorOff);

        document.querySelector("nav button:nth-child(5)").addEventListener("mouseover", hoverColor);
        document.querySelector("nav button:nth-child(5)").addEventListener("mouseout", hoverColorOff);

        function hoverColor() {
            this.classList.toggle("hoverfade");
            console.log("hoverColor");
        }

        function hoverColorOff() {
            this.classList.toggle("hoverfade");
            console.log("hoverColorOff");
        }









        // JS DER STYRER ARRAY STUFF


        let kategorier;
        let filter = "alle";


        // første funktion der kaldes efter DOM er loaded
        function start() {
            const filterKnapper = document.querySelectorAll("nav button");
            filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategorier));
            loadJSON();
        }

        function filtrerKategorier() {
            filter = this.dataset.kategori;

            document.querySelector(".valgt").classList.remove("valgt");
            this.classList.add("valgt");

            visKategorier();
            header.textContent = this.textContent;
        }


        async function loadJSON() {
            const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
                headers: myHeaders
            });
            kategorier = await JSONData.json();
            console.log("Kategorier", kategorier);
            visKategorier();
        }

        function visKategorier() {
            console.log("visKategorier");

            const dest = document.querySelector("#liste"); // container til articles med en kategori
            const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
            dest.textContent = "";

            kategorier.forEach(ret => {

                if (filter == ret.kategori || filter == "alle") {
                    // loop igennem json
                    const klon = skabelon.cloneNode(true);
                    klon.querySelector("img").src = medieurl + ret.billede[0];
                    klon.querySelector(".navn").textContent = ret.navn;
                    klon.querySelector(".beskrivelse1").innerHTML = ret.kortbeskrivelse;
                    //                    klon.querySelector(".beskrivelse2").textContent = ret.langbeskrivelse;
                    //                    klon.querySelector(".oprindelse").textContent += `${ret.oprindelsesregion}`;
                    klon.querySelector(".pris").textContent += `${ret.pris},-`;

                    klon.querySelector("article").addEventListener("click", () => visDetaljer(ret)); //laver eventlistener på ret, der fører én til en funktion, hvor man kan se detaljer om den valgte ret

                    dest.appendChild(klon);

                }
            })
        }

        function visDetaljer(hvilken) {
            console.log("visDetaljer");

            kategorier.forEach(ret => {
                if (hvilken._id == ret._id) {
                    document.querySelector("#detaljer h3").textContent = `${ret.navn}`;
                    document.querySelector("#detaljer img").src = medieurl + ret.billede;
                    document.querySelector("#detaljer .beskrivelse2").textContent = ret.langbeskrivelse;
                    document.querySelector("#detaljer .oprindelse").textContent = `Oprindelsesregion: ${ret.oprindelsesregion}`;
                    document.querySelector("#detaljer .pris").textContent = `Pris: ${ret.pris},-`;
                }
            })

        }
