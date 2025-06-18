import { createRoute,createRootRoute,createRouter,RouterProvider,Outlet,redirect } from "@tanstack/react-router";
import { lazyRouteComponent,Navigate } from "@tanstack/react-router";
// import LoginForm from "../components/login/LoginForm";
// import RegisterForm from "../components/login/RegisterForm";
// import AdminHome from "../pages/AdminHome";
import NavBar from "../components/base/NavBar";
import Footer from "../components/base/Footer";
// import UserHome from "../pages/UserHome";


const rootRoute=createRootRoute({
    component:()=>(
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
})

const loginRoute = createRoute({
  path: '/login',
  getParentRoute:()=>rootRoute,
  beforeLoad:()=>{
    const role=sessionStorage.getItem("user" ) || null
    if(role==="admin") throw redirect({to:"/admin-home"})
    else if(role==="employee") throw redirect({to:"/user-home"})
    
  },
  component: lazyRouteComponent(()=>import("../components/login/LoginForm")),
})

const  indexRouter=createRoute({
    path:"/",
    getParentRoute:()=>rootRoute,
    component:()=>{
          const id=sessionStorage.getItem("userID")
        const user=sessionStorage.getItem("user")
        if(user==="employee" && id)
        {
        return <Navigate to={`/user-home/${id}`}/>
        }
        else 
        {
        return <Navigate to="/login"/>
        }
    }
    })
        
    
    // loader:()=>{
    //     const id=sessionStorage.getItem("userID")
    //     const user=sessionStorage.getItem("user")
    //     if(user==="employee" && id)
    //     {
    //         throw redirect({to:`user-home/${id}`})
    //     }
    //     else 
    //     {
    //         throw redirect({
    //         to:"/login"
    //     })
    //     }
    // },


const registerRoute=createRoute({
    path:"/register",
    getParentRoute:()=>rootRoute,
    component: lazyRouteComponent(()=>import("../components/login/RegisterForm"))
})

const adminHome=createRoute({
    path:"/admin-home",
    getParentRoute:()=>rootRoute,
    beforeLoad:()=>{
        const role=sessionStorage.getItem("user") || null
        if(role!=="admin") throw redirect({to:"/login"})
    },
    component: lazyRouteComponent(()=>import("../pages/AdminHome")),
    
})

const userHome=createRoute({
    path:"/user-home/$id",
    getParentRoute:()=>rootRoute,
    beforeLoad:()=>{
        const role=sessionStorage.getItem("user") || null
        if(role!=="employee") throw redirect({to:"/login"})
    },
    component:lazyRouteComponent(()=>import("../pages/UserHome"))
})

const routeTree=rootRoute.addChildren([
    indexRouter,
    loginRoute,
    registerRoute,
    adminHome,
    userHome
])

const router=createRouter({routeTree})

export default function AppRouter(){
    return <RouterProvider router={router}/>
}