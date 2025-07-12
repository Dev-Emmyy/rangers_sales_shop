import Navbar from "./components/Navbar"; // Adjust path based on your folder structure
import styles from "./page.module.css";
import { Box } from "@mui/material";
import ProductCarousel from "./components/ProductCarousel"; 


export default function Home() {
  return (
    <Box>
      <main>
        <ProductCarousel />
      </main>
    </Box>
  );
}