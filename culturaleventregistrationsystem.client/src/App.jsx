import './App.css';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useRef, useState } from 'react';

function App() {

    const abortControllerRef = useRef < AbortController | null > (null);

    const [infoPageText, setInfoPageText] = useState("Text ze serveru.");
    const [currentPage, setCurrentPage] = useState("pageInit");

    const [regId, setRegId] = useState("0DD23V");
    const [regEmail, setRegEmail] = useState("myEmail1@centrum.com");
    const [regTel, setRegTel] = useState("492 447 262");
    const [regTicketsReserved, setRegTicketsReserved] = useState("5");

    const pageInit = currentPage == "pageInit"
        ?
        <Box sx={{ m: 3 }}>
            <Typography sx={{ mt: 2, color: "secondary.main" }}>
                Přivítejte Nový rok v jedinečné atmosféře na Silvestrovském festivalu světel a hudby 31. prosince 2027! Připravili jsme pro vás večer plný dechberoucích světelných instalací, živých hudebních vystoupení a okouzlujících ohňostrojů. Přijďte se ponořit do atmosféry radosti a oslav na jednom z nejkouzelnějších míst města, kde se setkají tradice s moderním uměním.
            </Typography>
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageCreate")} >Založ novou registraci</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageEdit")} >Načti nastavení registrace</Button>
            </Box>
        </Box>
        : "";

    const pageEditRegistration = currentPage == "pageEdit"
        ? <Box sx={{
            flexDirection: "row",
            justifyContent: "space-between",
        }} >
            <Typography variant="h3" sx={{ my: 4, textAlign: "left" }}>Vyplňte registrační číslo a poté načtěte nebo smažte rezervaci.</Typography>
            <TextField id="registrationId" label="Registrační číslo" variant="filled" value={regId} />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => { setCurrentPage("pageInfo"), deleteRegistrationsData({ regId }) }} >Smazat rezervaci</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => { setCurrentPage("pageEdit2"), loadUpdateRegistrationsData({ regId }) }} >Načíst rezervaci</Button>
            </Box>
        </Box>
        : "";

    const pageEditRegistration2 = currentPage == "pageEdit2"
        ? <Box sx={{
            flexDirection: "row",
            justifyContent: "space-between",
        }} >
            <Typography variant="h3" sx={{ my: 4, textAlign: "left" }}>Upravte vlastnosti rezervace {regId} a uložte změny.</Typography>
            <TextField sx={{ m: 1 }} id="registrationId" label="Registrační číslo" variant="filled" value={regId} />
            <TextField sx={{ m: 1 }} id="registrationEmail" label="Email" variant="filled" value={regEmail} />
            <TextField sx={{ m: 1 }} id="registrationTel" label="Telefon" variant="filled" value={regTel} />
            <TextField sx={{ m: 1 }} id="registrationTicketsReserved" label="Rezervované lístky" variant="filled" value={regTicketsReserved} />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => {setCurrentPage("pageInfo"), deleteRegistrationsData({ regId })}} >Smazat rezervaci</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => { setCurrentPage("pageInfo"), updateRegistrationsData({ regId }) }} >Uložit změny</Button>

            </Box>
        </Box>
        : "";

    const pageCreateRegistration = currentPage == "pageCreate"
        ?
        <Box sx={{
            flexDirection: "row",
            justifyContent: "space-between",
        }} >
            <Typography variant="h3" sx={{ my: 4, textAlign: "left" }}>Zadejte údaje nutné pro registraci. A poté potvrďte rezervací.</Typography>

            <TextField sx={{ m: 1 }} id="registrationEmail" label="Email" variant="filled" value={regEmail} />
            <TextField sx={{ m: 1 }} id="registrationTel" label="Telefon" variant="filled" value={regTel} />
            <TextField sx={{ m: 1 }} id="registrationTicketsReserved" label="Rezervované lístky" variant="filled" value={regTicketsReserved} />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => {setCurrentPage("pageInfo"), createRegistrationsData({ regId })}} >Závazně Rezervovat</Button>
            </Box>
        </Box>
        : "";

    const pageInfo = currentPage == "pageInfo"
        ?
        <Box sx={{ m: 3 }}>
            <Typography sx={{ mt: 2, color: "secondary.main" }}>
                {infoPageText}
            </Typography>
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
            </Box>
        </Box>
        : "";

    return (
        <Container>
            <Typography variant="h1" sx={{my: 4,textAlign: "center"}}>Silvestrovský festival světel a hudby 2027</Typography>

            {pageInit}
            {pageCreateRegistration}
            {pageEditRegistration}
            {pageEditRegistration2}
            {pageInfo}

        </Container>
    );


    async function deleteRegistrationsData(textId) {
        abortControllerRef.current?.Abort();

        setInfoPageText("Načítání. Čeká se na server.");
        setCurrentPage("pageInfo");
        try {
            const response = await fetch('Registrations/Delete?id=' + textId.regId, { signal: abortControllerRef.current?.signal, method: 'DELETE' });
            if (response.ok) {
                setInfoPageText("Rezervace s číslem " + textId.regId + " smazána.");
            } else {
                throw new Error(response?.status);
            }
        } catch (e) {
            setInfoPageText("Error: " + e.message);
        } 
    }

    async function loadUpdateRegistrationsData(textId) {
        abortControllerRef.current?.Abort();

        setInfoPageText("Načítání. Čeká se na server.");
        setCurrentPage("pageInfo");
        try {
            const response = await fetch('Registrations/Get?id=' + textId.regId, { signal: abortControllerRef.current?.signal, method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setRegId(data?.Id)
                setRegTel(data?.Tel)
                setRegEmail(data?.Email)
                setRegTicketsReserved(data?.TicketsReserved)

                setInfoPageText("Rezervace s číslem " + textId.regId + " načtena.");
                setCurrentPage("pageEdit2");
            } else {
                throw new Error(response.status);
            }
        } catch (e) {
            setInfoPageText("Error: " + e.message);
        }
    }

    async function updateRegistrationsData() {
        abortControllerRef.current?.Abort();

        setInfoPageText("Načítání. Čeká se na server.");
        setCurrentPage("pageInfo");
        try {
            const registrationsConstr = { Id: regId, email: regEmail, Tel: regTel, TicketsReserved: Number(regTicketsReserved) };
            const response = await fetch('Registrations/Update', { signal: abortControllerRef.current?.signal, method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(registrationsConstr) }); 
            if (response.ok) {
                const data = await response.json();
                setInfoPageText("Rezervace s číslem " + JSON.parse(JSON.stringify(data))?.Id + " upravena.");
            } else {
                throw new Error(response?.status);
            }
        } catch (e) {
            setInfoPageText("Error: " + e.message);
        }
        setCurrentPage("pageInfo");
    }

    async function createRegistrationsData() {
        abortControllerRef.current?.Abort();

        setInfoPageText("Načítání. Čeká se na server.");
        setCurrentPage("pageInfo");
        try {
            const registrationsConstr = { Id: regId, email: regEmail, Tel: regTel, TicketsReserved: Number(regTicketsReserved) };
            const response = await fetch('Registrations/Create', { signal: abortControllerRef.current?.signal, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(registrationsConstr) });
            if (response.ok) {
                const data = await response.json();
                //setRegistrations(data);
                setInfoPageText("Rezervace s číslem " + JSON.parse(JSON.stringify(data))?.Id + " vytvořena. Zapište si registrařní číslo!");
            } else {
                throw new Error(response?.status);
            }
        } catch (e) {
            setInfoPageText("Error: " + e.message);
        }
        setCurrentPage("pageInfo");
    }
}

export default App;