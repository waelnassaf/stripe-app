"use client"

import { ClipLoader } from "react-spinners"

export default function AdminLoading() {
    return (
        <div className="flex justify-center mt-10">
            <ClipLoader
                color={"#000"}
                loading={true}
                size={50}
                aria-label="Loading Spinner"
            />
        </div>
    )
}
