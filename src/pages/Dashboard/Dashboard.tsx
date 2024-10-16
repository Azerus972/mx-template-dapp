import { useState, useEffect } from 'react';
import { AuthRedirectWrapper } from 'wrappers';
import { Account } from './widgets';
import { Widget } from './components';
import { WidgetType } from 'types/widget.types';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Modal } from './components/Modal';

const WIDGETS: WidgetType[] = [
  {
    title: 'Compte',
    widget: Account,
    description: 'Détails du compte connecté',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  }
];

const REQUIRED_ZPAY = 1000;
const ZPAY_IDENTIFIER = 'ZPAY-247875';

export const Dashboard = () => {
  const { address } = useGetAccountInfo();
  const [hasEnoughZPAY, setHasEnoughZPAY] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkZPAYBalance = async () => {
      try {
        const response = await fetch(`https://api.multiversx.com/accounts/${address}/tokens?identifier=${ZPAY_IDENTIFIER}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const balance = parseInt(data[0].balance, 10);
          const hasEnough = balance >= REQUIRED_ZPAY;
          setHasEnoughZPAY(hasEnough);
          setShowModal(!hasEnough);
        } else {
          setHasEnoughZPAY(false);
          setShowModal(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du solde ZPAY:", error);
        setHasEnoughZPAY(false);
        setShowModal(true);
      }
    };

    if (address) {
      checkZPAYBalance();
    }
  }, [address]);

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6 max-w-3xl w-full'>
        {hasEnoughZPAY === true && WIDGETS.map((element) => (
          <Widget key={element.title} {...element} />
        ))}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2 className="text-xl font-bold mb-4">Solde ZPAY insuffisant</h2>
            <p>
              Pour utiliser ce service, vous devez posséder au moins {REQUIRED_ZPAY} {ZPAY_IDENTIFIER} sur votre adresse.
              Veuillez acquérir les jetons nécessaires avant de continuer.
            </p>
          </Modal>
        )}
      </div>
    </AuthRedirectWrapper>
  );
};
