import React from "react";
import AlbumPurchaseBanner from "../../components/AlbumPurchaseBanner/AlbumPurchaseForm";
import AlbumPurchaseForm from "../../components/AlbumPurchaseForm/AlbumPurchaseForm";
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";

const MusicStore = () => {

    useDocumentTitle("Music Store")

    return (
        <div>
            <h1>Purchase Our Album Below!</h1>
            <div>
                <AlbumPurchaseBanner />
                <AlbumPurchaseForm />
            </div>
        </div>
    )
}

export default MusicStore;