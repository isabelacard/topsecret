import { Button } from "@mui/material";

export function BtnLogin() {
    return (
        <Button
            type="submit"
            variant="contained"
            sx={{
                fontFamily: "Poppins",
                borderRadius: "18px",
                backgroundColor: "#9b7ff5",
                color: "white",
                paddingY: "10px",
                paddingX: "90px",
                "&:hover": {
                    backgroundColor: "#b28eff",
                },
            }}
        >
            Log in
        </Button>
    );
}
