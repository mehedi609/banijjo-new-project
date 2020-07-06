import React from 'react';
import Link from 'next/link';

const AppLink = ({ children, href, as = null }) => {
  return (
    <>
      <Link href={href} as={`${as ? as : href}`}>
        {children}
      </Link>

      <style jsx>{`
        a {
          color: #212529;
        }
        a:hover {
          color: #009345;
        }
      `}</style>
    </>
  );
};

export default AppLink;
