import React, { cloneElement, isValidElement, ReactNode } from 'react';
import styles from './Button.module.css';
import { getContrastColor } from './helper';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  radius?: ButtonSize;
  size?: ButtonSize;
  leftsection?: ReactNode;
  rightsection?: ReactNode;
  loading?: boolean;
}

interface ButtonVariantProps {
  filled: {
    color?: string;
  };
  light: {
    color?: string;
  };
  outline: {
    color?: string;
  };
  subtle: {
    color?: string;
  };
  gradient: {
    from: string;
    to: string;
    deg: number;
  };
}

interface ButtonProps extends ButtonBaseProps {
  variant?: keyof ButtonVariantProps;
  color?: string;
  from?: string;
  to?: string;
  deg?: number;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = 'md',
    radius = 'md',
    color = 'var(--color-blue-5)',
    children,
    disabled,
    variant = 'filled',
    style,
    className,
    leftsection,
    rightsection,
    loading,
    ...rest
  } = props;
  const styleObject = {
    '--button-radius': `var(--radius-${radius})`,
    '--base-color': color,
    '--text-color': getContrastColor(color)?.textColor,
    '--light-bg-color': getContrastColor(color)?.rgbaVariantbg,
    '--hover-light-color': getContrastColor(color)?.rgbaVarianthover,
    '--button--graidient': `linear-gradient(${props.deg}deg, ${props.from} 0%, ${props.to} 100%)`,
  } as React.CSSProperties;

  const buttonClassName = `
    ${styles[`button--common`]} 
    ${styles[`button--${size}`]}
    ${loading ? styles[`button--${variant}--${loading}`] : styles[`button--${variant}`]}
    ${loading ? styles['loader--visible'] : ''}
    ${className || ''}
  `.trim();

  // const childrenClassName = `${styles['flex--conatiner']} ${styles['child--container']}`.trim();

  const contentClassName = `
    ${styles['button--content']}
    ${loading ? styles['button--content--hidden'] : ''}
  `.trim();

  const loaderClassName = `${styles.loader} ${styles[`button--loader--${size}`]} ${styles[`button--loader--border--${variant}`]}`.trim();

  const iconSizeMap: Record<ButtonSize, number> = {
    xs: 18,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 26,
  };

  const renderIcon = (icon: ReactNode) => {
    if (isValidElement(icon)) {
      return cloneElement(icon, {
        size: iconSizeMap[size],
      });
    }
    return icon;
  };

  return (
    <button className={buttonClassName} style={{ ...styleObject, ...style }} disabled={loading || disabled} {...rest}>
      <div className={styles['button--wrapper']}>
        {loading && (
          <span className={`${styles['loader--position']}`}>
            <span className={loaderClassName}></span>
          </span>
        )}
        <span className={`${contentClassName}`} style={{ visibility: loading ? 'hidden' : 'visible' }}>
          {leftsection && <span className={styles['flex--conatiner']}>{renderIcon(leftsection)}</span>}
          <span className={styles['flex--conatiner']}>{children}</span>
          {rightsection && <span className={styles['flex--conatiner']}>{renderIcon(rightsection)}</span>}
        </span>
      </div>
    </button>
  );
};

export default Button;
