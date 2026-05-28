import React, { ReactNode } from 'react';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InputVariant = 'default' | 'filled' | 'unstyled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  radius?: InputSize;
  variant?: InputVariant;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  leftSectionWidth?: number;
  rightSectionWidth?: number;
  leftSectionPointerEvents?: 'none' | 'all';
  rightSectionPointerEvents?: 'none' | 'all';
  loading?: boolean;
  loadingPosition?: 'left' | 'right';
  error?: boolean | ReactNode;
}

interface InputWrapperProps {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  withAsterisk?: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  description,
  error,
  required,
  withAsterisk,
  children,
  id,
  className,
  style,
}) => {
  const showAsterisk = withAsterisk !== false && (required || withAsterisk === true);

  return (
    <div className={`${styles['wrapper-root']} ${className ?? ''}`} style={style}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {showAsterisk && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {description && <span className={styles.description}>{description}</span>}
      {children}
      {error && typeof error !== 'boolean' && (
        <span className={styles['error-message']} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

const Input: React.FC<InputProps> & { Wrapper: typeof InputWrapper } = (props) => {
  const {
    size = 'md',
    radius = 'sm',
    variant = 'default',
    leftSection,
    rightSection,
    leftSectionWidth,
    rightSectionWidth,
    leftSectionPointerEvents = 'none',
    rightSectionPointerEvents = 'none',
    loading = false,
    loadingPosition = 'right',
    error,
    disabled,
    className,
    style,
    ...rest
  } = props;

  const loaderClassName = `${styles.loader} ${styles[`loader--${size}`]} ${styles[`loader--color--${variant}`]}`;

  const effectiveLeftSection =
    loading && loadingPosition === 'left' ? (
      <span className={loaderClassName} />
    ) : (
      leftSection
    );

  const effectiveRightSection =
    loading && loadingPosition === 'right' ? (
      <span className={loaderClassName} />
    ) : (
      rightSection
    );

  const hasLeftSection = Boolean(effectiveLeftSection);
  const hasRightSection = Boolean(effectiveRightSection);
  const hasError = Boolean(error);

  const styleObject = {
    '--input-radius': `var(--radius-${radius})`,
    '--input-left-section-width': leftSectionWidth
      ? `${leftSectionWidth}px`
      : `var(--input-section-width-${size})`,
    '--input-right-section-width': rightSectionWidth
      ? `${rightSectionWidth}px`
      : `var(--input-section-width-${size})`,
    '--input-padding-left': hasLeftSection ? '0' : `var(--input-padding-${size})`,
    '--input-padding-right': hasRightSection ? '0' : `var(--input-padding-${size})`,
  } as React.CSSProperties;

  const wrapperClassName = [
    styles.wrapper,
    styles[`wrapper--${size}`],
    styles[`wrapper--${variant}`],
    hasError ? styles['wrapper--error'] : '',
    disabled ? styles['wrapper--disabled'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClassName = [
    styles['input--common'],
    variant === 'unstyled' ? styles['input--unstyled'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName} style={{ ...styleObject, ...style }}>
      {hasLeftSection && (
        <div
          className={`${styles.section} ${styles['section--left']} ${styles[`section--pointer-${leftSectionPointerEvents}`]}`}
        >
          {effectiveLeftSection}
        </div>
      )}
      <input
        className={inputClassName}
        disabled={loading || disabled}
        aria-invalid={hasError ? true : undefined}
        {...rest}
      />
      {hasRightSection && (
        <div
          className={`${styles.section} ${styles['section--right']} ${styles[`section--pointer-${rightSectionPointerEvents}`]}`}
        >
          {effectiveRightSection}
        </div>
      )}
    </div>
  );
};

Input.Wrapper = InputWrapper;

export default Input;
