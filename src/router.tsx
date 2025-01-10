import { createBrowserRouter } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop.tsx";
import NotFoundPage from '@/pages/NotFound.tsx';
import HomePage from '@/pages/Home.tsx';
import Contact from '@/pages/Contact.tsx';
import Faq from '@/pages/Faq.tsx';
import About from '@/pages/About.tsx';
import Pricing from '@/pages/Pricing.tsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.tsx';
import TermsOfUse from '@/pages/TermsOfUse.tsx';

import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import Login from '@/pages/auth/Login.tsx';
import Signup from '@/pages/auth/Signup.tsx';
import SignupType from "@/pages/auth/SignupType.tsx";
import SignupArtistDetails from "@/pages/auth/SignupArtistDetails.tsx";
import SignuRecordLabelDetails from "@/pages/auth/SignupRecordLabelDetails.tsx";
import ForgotPassword from "@/pages/auth/ForgotPassword.tsx";
import VerifyEmail from "@/pages/auth/VerifyEmail.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";

import AccountLayout from "@/pages/account/AccountLayout.tsx";
import DashboardHome from "@/pages/account/DashboardHome.tsx";

import DashboardArtist from "@/pages/account/artist/DashboardArtist.tsx";
import DashboardRecordLabel from "@/pages/account/recordLabel/DashboardRecordLabel.tsx";
import CreateSingle from "@/pages/account/createReleases/singles/CreateSingleRelease.tsx";
import CreateSingleRelease2 from "@/pages/account/createReleases/singles/CreateSingleRelease2.tsx";

// import BalanceHistory from "@/pages/account/artist/BalanceHistory.tsx";
// import SalesReport from "@/pages/account/artist/SalesReport.tsx";
// import AnalyticsReach from "@/pages/account/artist/AnalyticsReach.tsx";
// import SongDetails from "@/pages/account/artist/SongDetails.tsx";
// import AlbumDetails from "@/pages/account/artist/AlbumDetails.tsx";
// import AllMusic from "@/pages/account/artist/AllMusic.tsx";

import BalanceHistory from "@/pages/account/analytics/BalanceHistory";
import SalesReport from "@/pages/account/analytics/SalesReport.tsx";
import AnalyticsReach from "@/pages/account/analytics/AnalyticsReach.tsx";
import SongDetails from "@/pages/account/analytics/SongDetails.tsx";
import AlbumDetails from "@/pages/account/analytics/AlbumDetails.tsx";
import AllMusic from "@/pages/account/analytics/AllMusic.tsx";


import CreateAlbumReleaseDetails from "@/pages/account/createReleases/album/AlbumDetails";
import CreateAlbumReleaseAdvanceFeatures from "@/pages/account/createReleases/album/AdvanceFeatures";
import CreateAlbumReleaseSelectStores from "@/pages/account/createReleases/album/SelectStores";
import CreateAlbumReleaseSongUpload from "@/pages/account/createReleases/album/SongUpload";
import CreateAlbumReleaseAlbumArt from "@/pages/account/createReleases/album/AlbumArt";
import CreateAlbumReleaseOverview from "@/pages/account/createReleases/album/Overview";
import AddArtistRecordLabel from "@/pages/account/recordLabel/AddArtist.tsx";

// import BalanceHistory_RL from "@/pages/account/recordLabel/BalanceHistory_RL.tsx";
// import SalesReport_RL from "@/pages/account/recordLabel/SalesReport.tsx";
// import AnalyticsReach_RL from "@/pages/account/recordLabel/AnalyticsReach_RL.tsx";
// import SongDetails_RL from "@/pages/account/recordLabel/SongDetails.tsx";
// import AlbumDetails_RL from "@/pages/account/recordLabel/AlbumDetails_RL.tsx";
// import AllMusic_RL from "@/pages/account/recordLabel/AllMusic_RL.tsx";

import ArtistList_RL from "@/pages/account/recordLabel/ArtistList.tsx";
import AccountFaq from "./pages/account/AccountFaq";
import CartPage from "./pages/account/createReleases/cartCheckout/Cart";
import CartCheckoutPage from "./pages/account/createReleases/cartCheckout/Checkout";
// import ArtistAnalytics_RL from "./pages/account/recordLabel/ArtistAnalytics_RL";
import SuccessfulPayment from "./pages/account/createReleases/cartCheckout/SuccessfulPayment";
import ArtistSongs_RL from "./pages/account/recordLabel/ArtistSongs_RL";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "faq",
          element: <Faq />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "pricing",
          element: <Pricing />
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />
        },
        {
          path: "terms-of-use",
          element: <TermsOfUse />
        },
        {
          path: "about",
          element: <About />
        },

        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />
            },
            {
              path: "verify-email",
              element: <VerifyEmail />
            },
            {
              path: "create-new-password",
              element: <CreateNewPassword />
            },
            {
              path: "signup",
              element: <Signup />
            },
            {
              path: "signup-type",
              element: <SignupType />
            },
            {
              path: "signup-artistDetails",
              element: <SignupArtistDetails />
            },
            {
              path: "signup-recordLabelDetails",
              element: <SignuRecordLabelDetails />
            },
          ]
        },

        {
          path: "account",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <DashboardHome />
            },
            {
              path: "faq",
              element: <AccountFaq />
            },

            {
              path: "cart",
              element: <CartPage />
            },
            {
              path: "checkout",
              element: <CartCheckoutPage />
            },
            {
              path: "checkout/success",
              element: <SuccessfulPayment />
            },

            {
              path: "create-single-release",
              element: <CreateSingle />
            },
            {
              path: "create-single-release-continue",
              element: <CreateSingleRelease2 />
            },
            {
              path: "create-album-release-details",
              element: <CreateAlbumReleaseDetails />
            },
            {
              path: "create-album-release-advance-features",
              element: <CreateAlbumReleaseAdvanceFeatures />
            },
            {
              path: "create-album-release-select-stores",
              element: <CreateAlbumReleaseSelectStores />
            },
            {
              path: "create-album-release-song-upload",
              element: <CreateAlbumReleaseSongUpload />
            },
            {
              path: "create-album-release-album-art",
              element: <CreateAlbumReleaseAlbumArt />
            },
            {
              path: "create-album-release-overview",
              element: <CreateAlbumReleaseOverview />
            },

            {
              path: "analytics",
              // element: <DashboardArtist />,
              children: [
                // {
                //   path: "",
                //   element: <DashboardArtist />,
                // },
                {
                  path: "balance-history",
                  element: <BalanceHistory />
                },
                {
                  path: "sales-report",
                  element: <SalesReport />
                },
                {
                  path: "analytics-reach",
                  element: <AnalyticsReach />
                },
                {
                  path: "song-details",
                  element: <SongDetails />
                },
                {
                  path: "album-details",
                  element: <AlbumDetails />
                },
                {
                  path: "all-music",
                  element: <AllMusic />
                },
              ]
            },

            {
              path: "artist",
              // element: <DashboardArtist />,
              children: [
                {
                  path: "",
                  element: <DashboardArtist />,
                },
                // {
                //   path: "balance-history",
                //   element: <BalanceHistory />
                // },
                // {
                //   path: "sales-report",
                //   element: <SalesReport />
                // },
                // {
                //   path: "analytics-reach",
                //   element: <AnalyticsReach />
                // },
                // {
                //   path: "song-details",
                //   element: <SongDetails />
                // },
                // {
                //   path: "album-details",
                //   element: <AlbumDetails />
                // },
                // {
                //   path: "all-music",
                //   element: <AllMusic />
                // },
              ]
            },
            {
              path: "record-label",
              // element: <DashboardRecordLabel />,
              children: [
                {
                  path: "",
                  element: <DashboardRecordLabel />,
                },
                {
                  path: "add-artist",
                  element: <AddArtistRecordLabel />,
                },
                {
                  path: "artist",
                  element: <ArtistList_RL />,
                },
                {
                  path: "artist-songs",
                  element: <ArtistSongs_RL />,
                },
                // {
                //   path: "artist-analytics",
                //   element: <ArtistAnalytics_RL />,
                // },

                // {
                //   path: "balance-history",
                //   element: <BalanceHistory_RL />
                // },
                // {
                //   path: "sales-report",
                //   element: <SalesReport_RL />
                // },
                // {
                //   path: "analytics-reach",
                //   element: <AnalyticsReach_RL />
                // },
                // {
                //   path: "song-details",
                //   element: <SongDetails_RL />
                // },
                // {
                //   path: "album-details",
                //   element: <AlbumDetails_RL />
                // },
                // {
                //   path: "all-music",
                //   element: <AllMusic_RL />
                // },

              ]
            },
          ]
        },


        {
          path: "*",
          element: <NotFoundPage />
        }
      ]
  
    },

    {
      path: "*",
      element: <NotFoundPage />
    }
]);