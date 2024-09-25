import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import { Box, Container, Typography, Link } from "@mui/material";
import logo from "../../../assets/logo.svg";

const FooterHome = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <hr style={{ margin: "20px 0" }} />
        <Box textAlign="center">
          <Link href="#" color="text.primary" variant="h6" underline="none">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "24px", marginRight: "8px" }}
            />
            Land
          </Link>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            © 2021-2022 Land™. All Rights Reserved. Built with{" "}
            <Link color="primary" underline="hover">
              Space Z
            </Link>{" "}
            and{" "}
            <Link color="primary" underline="hover">
              Tailwind CSS
            </Link>
            .
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <Facebook />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <Twitter />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <Instagram />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <LinkedIn />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <GitHub />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterHome;
