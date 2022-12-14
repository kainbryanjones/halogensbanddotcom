import React from "react";
import AlbumPurchaseBanner from "../../components/AlbumPurchaseBanner/AlbumPurchaseForm";
import AlbumPurchaseForm from "../../components/AlbumPurchaseForm/AlbumPurchaseForm";

const MusicStore = () => {
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