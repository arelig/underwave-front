// lib/submitOrder.js

export const submitOrder = async (email, details) => {
  const orderData = {
    email: email,
    status: 'created',
    details: details.map((album) => ({
      album_uuid: album.uuid,
      quantity: album.quantity,
    })),
  };

  try {
    const response = await fetch('http://localhost:8000/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Error al enviar la orden');
    }

    const order = await response.json();
    console.log('La orden se envió correctamente', order);
    return order;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};