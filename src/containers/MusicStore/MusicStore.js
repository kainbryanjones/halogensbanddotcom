import React from "react";
import AlbumPurchaseBanner from "../../components/AlbumPurchaseBanner/AlbumPurchaseForm";
import AlbumPurchaseForm from "../../components/AlbumPurchaseForm/AlbumPurchaseForm";

const MusicStore = () => {
    return (
        <div>
            <h1>Music Store</h1>
            <AlbumPurchaseBanner />
            <AlbumPurchaseForm />
            <div>
            </div>
        </div>
    )
}


export default MusicStore;