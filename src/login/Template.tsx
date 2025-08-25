import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
import { useInitialize } from 'keycloakify/login/Template.useInitialize';
import type { TemplateProps } from 'keycloakify/login/TemplateProps';
import { clsx } from 'keycloakify/tools/clsx';
import { useSetClassName } from 'keycloakify/tools/useSetClassName';
import { useEffect } from 'react';
import LogoBaharkam from './assets/img/baharkam.png';
import type { I18n } from './i18n';
import type { KcContext } from './KcContext';

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr } = i18n;

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr('loginTitle', realm.displayName);
  }, []);

  useSetClassName({
    qualifiedName: 'html',
    className: kcClsx('kcHtmlClass'),
  });

  useSetClassName({
    qualifiedName: 'body',
    className: bodyClassName ?? kcClsx('kcBodyClass'),
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 min-h-[100svh] w-[100svw]">
      <div className="h-full flex flex-col justify-between">
        <div />

        <div className="p-8 flex flex-col justify-center relative">
          <div className="space-y-8 w-full max-w-[28rem] mx-auto">
            <div>
              <img src={LogoBaharkam} className="w-20 h-20 object-contain" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Selamat Datang di</h1>
              <h2 className="text-2xl font-bold text-primary">Baharkam Information Gateway</h2>
              <p className="text-base text-gray-600">Login terlebih dahulu untuk mengakses sistem BIG</p>
            </div>

            <div>
              <header>
                {(() => {
                  const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                    <h1 id="kc-page-title">{headerNode}</h1>
                  ) : (
                    <div id="kc-username" className="my-8 bg-gray-200 p-2">
                      <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                      <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr('restartLoginTooltip')}>
                        <div className="kc-login-tooltip">
                          <i className={kcClsx('kcResetFlowIcon')}></i>
                          <span className="kc-tooltip-text">{msg('restartLoginTooltip')}</span>
                        </div>
                      </a>
                    </div>
                  );

                  if (displayRequiredFields) {
                    return (
                      <div className={kcClsx('kcContentWrapperClass')}>
                        <div className={clsx(kcClsx('kcLabelWrapperClass'), 'subtitle')}>
                          <span className="subtitle">
                            <span className="required">*</span>
                            {msg('requiredFields')}
                          </span>
                        </div>
                        <div className="col-md-10">{node}</div>
                      </div>
                    );
                  }

                  return node;
                })()}
              </header>

              <div id="kc-content">
                <div id="kc-content-wrapper">
                  {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                  {displayMessage && message !== undefined && (message.type !== 'warning' || !isAppInitiatedAction) && (
                    <div
                      className={clsx(`alert-${message.type}`, kcClsx('kcAlertClass'), `pf-m-${message?.type === 'error' ? 'danger' : message.type}`)}
                    >
                      <div className="pf-c-alert__icon">
                        {message.type === 'success' && <span className={kcClsx('kcFeedbackSuccessIcon')}></span>}
                        {message.type === 'warning' && <span className={kcClsx('kcFeedbackWarningIcon')}></span>}
                        {message.type === 'error' && <span className={kcClsx('kcFeedbackErrorIcon')}></span>}
                        {message.type === 'info' && <span className={kcClsx('kcFeedbackInfoIcon')}></span>}
                      </div>
                      <span
                        className={kcClsx('kcAlertTitleClass')}
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(message.summary),
                        }}
                      />
                    </div>
                  )}
                  {children}
                  {auth !== undefined && auth.showTryAnotherWayLink && (
                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                      <div className={kcClsx('kcFormGroupClass')}>
                        <input type="hidden" name="tryAnotherWay" value="on" />
                        <a
                          href="#"
                          id="try-another-way"
                          onClick={() => {
                            document.forms['kc-select-try-another-way-form' as never].requestSubmit();
                            return false;
                          }}
                        >
                          {msg('doTryAnotherWay')}
                        </a>
                      </div>
                    </form>
                  )}
                  {socialProvidersNode}
                  {displayInfo && (
                    <div id="kc-info" className={kcClsx('kcSignUpClass')}>
                      <div id="kc-info-wrapper" className="!bg-transparent text-center !text-base">
                        {infoNode}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-800 flex justify-start items-center p-6 text-sm text-gray-400 bg-transparent pointer-events-none">
          <p>Copyright &copy; 2023 Baharkam Polri.</p>
        </div>
      </div>

      <div className="bg-primaryGlow p-4">
        <p className="text-white text-base text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus necessitatibus perspiciatis nostrum voluptates minus recusandae,
          quibusdam sequi porro vitae dolores iste, quod voluptatem facere commodi illo doloremque illum modi.
        </p>
      </div>
    </div>
  );
}
