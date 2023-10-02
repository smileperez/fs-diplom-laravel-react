import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import SidebarComponent from "../components/admin/SidebarComponent";

export default function DefaultLayout() {
    const { currentUser, userToken } = useStateContext();

    if (!userToken) {
        return <Navigate to="/auth/signin" />;
    }

    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <SidebarComponent currentUser={currentUser} />
            <div className="p-10 flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}
