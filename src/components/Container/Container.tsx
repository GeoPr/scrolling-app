import React, { FC } from 'react'

export const Container: FC = ({ children }) => (
  <div className="wrapper">
    <main className="page">
      <section className="page__sc sc">
        <div className="sc__container _container">{children}</div>
      </section>
    </main>
  </div>
)
