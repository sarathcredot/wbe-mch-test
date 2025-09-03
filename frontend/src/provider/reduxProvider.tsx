

'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function ReduxProvider({ children }: Props) {
    return <Provider store={store}>{children}</Provider>;
}