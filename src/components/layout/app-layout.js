import {useState,useEffect} from "react"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"
import { useUser } from "../../context/user-context"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import AdbIcon from "@mui/icons-material/Adb"
import { BooksList } from "../books-list/books-list"
import { Login } from "@mui/icons-material"
import { LoginDialog } from "../login/login-dailog"
import { BookForm } from "../book-form/book-form"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"




export const AppLayout = () => {
    const [openLoginDailog,setOpenLoginDialog] = useState(false)
    
    const {loginUse, logoutUser} = userUser()




    const handleLoginSubmit = (username, password) =>{
    loginUser(username,password)
    setOpenLoginDialog(false)
    }

    const handleLoginClose = () =>{
        setOpenLoginDialog(false)
    }
    const handleLogout() => {
        logoutUser()
    handleCloseUserMenu()
        }
    return (
        <>
        
        <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                  variant="h6"
                                noWrap
                                sx={{
                                  mr: 2,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                Library Management System
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                          <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                    
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
            <Route path="/books" exact element={<BooksList />} />
                <Route 
                path="/admin/books/add"
                element={
                    <WithLoginProtector>
                        <WithAdminProtector>
                            <BookForm />
                        </WithAdminProtector>
                    </WithLoginProtector>
                }
                exact
                />
                <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
            <LoginDialog
            open={openLoginDailog}
            handleSubmit={handleLoginClose}
            handleClose={handleLoginClose}
            />
            </>
    )
}