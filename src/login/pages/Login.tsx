import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { getKcClsx, type KcClsx } from 'keycloakify/login/lib/kcClsx';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import { assert } from 'keycloakify/tools/assert';
import { clsx } from 'keycloakify/tools/clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';

export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError('username', 'password')}
      headerNode={<></>}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span className="text-gray-600">
              {msg('noAccount')}{' '}
              <a
                tabIndex={8}
                href={url.registrationUrl}
                className="text-primary hover:!text-primaryGlow hover:!no-underline font-medium transition-colors"
              >
                {msg('doRegister')}
              </a>
            </span>
          </div>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
            <div id="kc-social-providers" className={kcClsx('kcFormSocialAccountSectionClass')}>
              <hr />
              <h2>{msg('identity-provider-login-label')}</h2>
              <ul className={kcClsx('kcFormSocialAccountListClass', social.providers.length > 3 && 'kcFormSocialAccountListGridClass')}>
                {social.providers.map((...[p, , providers]) => (
                  <li key={p.alias}>
                    <a
                      id={`social-${p.alias}`}
                      className={kcClsx('kcFormSocialAccountListButtonClass', providers.length > 3 && 'kcFormSocialAccountGridItem')}
                      type="button"
                      href={p.loginUrl}
                    >
                      {p.iconClasses && <i className={clsx(kcClsx('kcCommonLogoIdP'), p.iconClasses)} aria-hidden="true"></i>}
                      <span
                        className={clsx(kcClsx('kcFormSocialAccountNameClass'), p.iconClasses && 'kc-social-icon-text')}
                        dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                      ></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true);
                return true;
              }}
              action={url.loginAction}
              method="post"
              className="space-y-6"
            >
              {!usernameHidden && (
                <div className="space-y-2">
                  <label htmlFor="username" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-foreground">
                    {!realm.loginWithEmailAllowed ? msg('username') : !realm.registrationEmailAsUsername ? msg('usernameOrEmail') : msg('email')}
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    tabIndex={2}
                    id="username"
                    className="flex h-10 bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    name="username"
                    defaultValue={login.username ?? ''}
                    placeholder="Masukkan username atau email Anda"
                    type="text"
                    autoFocus
                    autoComplete="username"
                    aria-invalid={messagesPerField.existsError('username', 'password')}
                  />
                  {messagesPerField.existsError('username', 'password') && (
                    <span
                      id="input-error"
                      className="inline-block text-red-500 mt-2"
                      aria-live="polite"
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.getFirstError('username', 'password')),
                      }}
                    />
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-foreground">
                  {msg('password')}
                  <span className="text-red-500"> *</span>
                </label>
                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                  <input
                    tabIndex={3}
                    id="password"
                    className="flex h-10 bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    name="password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError('username', 'password')}
                  />
                </PasswordWrapper>
                {usernameHidden && messagesPerField.existsError('username', 'password') && (
                  <span
                    id="input-error"
                    className="inline-block text-red-500 mt-2"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(messagesPerField.getFirstError('username', 'password')),
                    }}
                  />
                )}
              </div>

              <div className={clsx('flex', realm.rememberMe && !usernameHidden ? 'justify-between' : 'justify-end')}>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div>
                      <label className="inline-flex gap-2 items-center">
                        <input tabIndex={5} id="rememberMe" name="rememberMe" type="checkbox" defaultChecked={!!login.rememberMe} className="!m-0" />
                        <span>{msg('rememberMe')}</span>
                      </label>
                    </div>
                  )}
                </div>
                <div className={kcClsx('kcFormOptionsWrapperClass')}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a
                        tabIndex={6}
                        href={url.loginResetCredentialsUrl}
                        className="text-sm text-primary hover:!text-primaryGlow hover:!no-underline transition-colors"
                      >
                        {msg('doForgotPassword')}
                      </a>
                    </span>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className={kcClsx('kcFormGroupClass')}>
                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                <input
                  tabIndex={7}
                  disabled={isLoginButtonDisabled}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full bg-button-primary hover:bg-button-primary/80 text-button-primary-foreground font-semibold py-3 rounded-lg shadow-brand transition-all duration-200 hover:shadow-elevated"
                  name="login"
                  id="kc-login"
                  type="submit"
                  value={msgStr('doLogIn')}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
  const { i18n, passwordInputId, children } = props;

  const { msgStr } = i18n;

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

  useEffect(() => {
    const passwordInputElement = document.getElementById(passwordInputId);

    assert(passwordInputElement instanceof HTMLInputElement);

    passwordInputElement.type = isPasswordRevealed ? 'text' : 'password';
  }, [isPasswordRevealed]);

  return (
    <div className="relative">
      {children}
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={msgStr(isPasswordRevealed ? 'hidePassword' : 'showPassword')}
        aria-controls={passwordInputId}
        onClick={toggleIsPasswordRevealed}
      >
        {isPasswordRevealed ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
