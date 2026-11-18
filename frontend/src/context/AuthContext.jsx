import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_ADDRESS = {
  id: 'addr-default',
  name: 'Rahul Sharma',
  phone: '9876543210',
  pincode: '560103',
  locality: 'Bellandur Outer Ring Road',
  address: 'Flat 402, Green Glen Layout, Behind EcoSpace',
  city: 'Bengaluru',
  state: 'Karnataka',
  landmark: 'Near Central Mall',
  addressType: 'HOME',
  isDefault: true
};

const DEFAULT_GIFT_CARDS = [
  {
    id: 'gc-101',
    cardNumber: 'FKGC-8921-7742-1092',
    pin: '849201',
    balance: 1000,
    initialBalance: 1000,
    expiry: '31 Dec 2026',
    status: 'ACTIVE',
    date: '2026-11-10'
  }
];

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('fk_token') || 'fk_token_demo_user');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fk_user');
    return saved
      ? JSON.parse(saved)
      : {
          id: 'usr_demo',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@flipkart.demo',
          phone: '9876543210',
          isPlusMember: true,
          superCoins: 240
        };
  });

  const [superCoins, setSuperCoins] = useState(() => {
    const saved = localStorage.getItem('fk_supercoins');
    return saved !== null ? parseInt(saved, 10) : 240;
  });

  const [giftCards, setGiftCards] = useState(() => {
    const saved = localStorage.getItem('fk_gift_cards');
    return saved ? JSON.parse(saved) : DEFAULT_GIFT_CARDS;
  });

  const [redeemedRewards, setRedeemedRewards] = useState(() => {
    const saved = localStorage.getItem('fk_redeemed_rewards');
    return saved ? JSON.parse(saved) : [];
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('fk_addresses');
    return saved ? JSON.parse(saved) : [DEFAULT_ADDRESS];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return savedAddresses[0]?.id || 'addr-default';
  });

  useEffect(() => {
    if (token) localStorage.setItem('fk_token', token);
    else localStorage.removeItem('fk_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('fk_user', JSON.stringify(user));
    else localStorage.removeItem('fk_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fk_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  useEffect(() => {
    localStorage.setItem('fk_supercoins', superCoins.toString());
  }, [superCoins]);

  useEffect(() => {
    localStorage.setItem('fk_gift_cards', JSON.stringify(giftCards));
  }, [giftCards]);

  useEffect(() => {
    localStorage.setItem('fk_redeemed_rewards', JSON.stringify(redeemedRewards));
  }, [redeemedRewards]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const addAddress = (newAddr) => {
    const addrWithId = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setSavedAddresses((prev) => [addrWithId, ...prev]);
    setSelectedAddressId(addrWithId.id);
    return addrWithId;
  };

  // SuperCoins & Rewards
  const redeemReward = (reward) => {
    if (superCoins < reward.coins) {
      return { success: false, message: 'Insufficient SuperCoins!' };
    }
    const couponCode = `FK-${reward.codePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuperCoins((prev) => prev - reward.coins);
    const newRedemption = {
      id: `red-${Date.now()}`,
      title: reward.title,
      discount: reward.discount,
      coinsSpent: reward.coins,
      couponCode,
      redeemedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      expiry: '31 Dec 2026'
    };
    setRedeemedRewards((prev) => [newRedemption, ...prev]);
    return { success: true, couponCode, message: 'Reward redeemed successfully!' };
  };

  // Gift Cards
  const totalGiftCardBalance = giftCards.reduce((acc, gc) => acc + (gc.balance || 0), 0);

  const applyGiftCard = (cardNumber, pin) => {
    const cleanNum = cardNumber.trim().toUpperCase();
    const cleanPin = pin.trim();
    if (cleanNum.length < 10 || cleanPin.length < 4) {
      return { success: false, message: 'Invalid Card Number or PIN format.' };
    }
    if (giftCards.some((gc) => gc.cardNumber === cleanNum)) {
      return { success: false, message: 'This Gift Card is already added to your account.' };
    }
    const balance = 500 + Math.floor(Math.random() * 4) * 500; // ₹500, ₹1000, ₹1500, or ₹2000
    const newCard = {
      id: `gc-${Date.now()}`,
      cardNumber: cleanNum,
      pin: cleanPin,
      balance: balance,
      initialBalance: balance,
      expiry: '31 Dec 2026',
      status: 'ACTIVE',
      date: new Date().toISOString().split('T')[0]
    };
    setGiftCards((prev) => [newCard, ...prev]);
    return { success: true, balance, message: `Gift Card added successfully! ₹${balance} credited.` };
  };

  const buyGiftCard = (amount, recipientEmail, message) => {
    const randomCardNum = `FKGC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomPin = `${Math.floor(100000 + Math.random() * 900000)}`;
    const newCard = {
      id: `gc-${Date.now()}`,
      cardNumber: randomCardNum,
      pin: randomPin,
      balance: amount,
      initialBalance: amount,
      recipientEmail,
      message,
      expiry: '31 Dec 2026',
      status: 'ACTIVE',
      date: new Date().toISOString().split('T')[0]
    };
    setGiftCards((prev) => [newCard, ...prev]);
    return { success: true, card: newCard, message: `Gift Card of ₹${amount} issued successfully!` };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        login,
        logout,
        savedAddresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        superCoins,
        redeemReward,
        redeemedRewards,
        giftCards,
        totalGiftCardBalance,
        applyGiftCard,
        buyGiftCard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
