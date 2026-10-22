import './App.css';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {

    // const [registrations, setRegistrations] = useState();

    // useEffect(() => {
    //     populateRegistrationsData();
    // }, []);

    const [currentPage, setCurrentPage] = useState("pageInit");

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
            <TextField id="registrationId" label="Registrační číslo" variant="outlined" />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInfo")} >Smazat rezervaci</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageEdit2")} >Načíst rezervaci</Button>
            </Box>
        </Box>
        : "";

    const pageEditRegistration2 = currentPage == "pageEdit2"
        ? <Box sx={{
            flexDirection: "row",
            justifyContent: "space-between",
        }} >
            <Typography variant="h3" sx={{ my: 4, textAlign: "left" }}>Upravte vlastnosti rezervace a uložte změny.</Typography>
            <TextField id="registrationId" label="Registrační číslo" variant="outlined" />
            <TextField id="registrationEmail" label="Email" variant="outlined" />
            <TextField id="registrationTel" label="Telefon" variant="outlined" />
            <TextField id="registrationTicketsReserved" label="Rezervované lístky" variant="outlined" />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInfo")} >Smazat rezervaci</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInfo")} >Uložit změny</Button>

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
            <TextField id="registrationEmail" label="Email" variant="outlined" />
            <TextField id="registrationTel" label="Telefon" variant="outlined" />
            <TextField id="registrationTicketsReserved" label="Rezervované lístky" variant="outlined" />
            <Box sx={{
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInit")} >Zpět</Button>
                <Button variant="outlined" sx={{ m: 3 }} onClick={() => setCurrentPage("pageInfo")} >Závazně Rezervovat</Button>
            </Box>
        </Box>
        : "";

    const pageInfo = currentPage == "pageInfo"
        ?
        <Box sx={{ m: 3 }}>
            <Typography sx={{ mt: 2, color: "secondary.main" }}>
                Text ze serveru
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
    
    // async function populateRegistrationsData() {
    //     const response = await fetch('GetTest');
    //     if (response.ok) {
    //         const data = await response.json();
    //         setRegistrations(data);
    //     }
    // }
}

export default App;