import { Link, useRouter } from '@tanstack/react-router';
import confetti from 'canvas-confetti';
import { ArrowRightIcon, CalendarHeartIcon, CheckIcon } from 'lucide-react';
import { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';

import { downloadIcsFile } from '@/libs/addCalendar';
import { dateFns } from '@/libs/date';
import { cn } from '@/libs/utils';

import CircleLoading from '../animation/CircleLoading';
import { BorderBeam } from '../background/BorderBeam';
import { FormInputFloating } from '../form/FormInput';
import FormRadioBtn from '../form/FormRadioBtn';
import { Modal } from './AnimatedModal';

type TModalAcceptProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pType?: string;
  pName?: string;
};
const ModalAccept = ({ open, setOpen, pType, pName }: TModalAcceptProps) => {
  const uid = useId();
  const router = useRouter();

  const methodForm = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      invitedTime: '',
      partyDay: '',
      accepted: 'YES',
      partyName: 'h',
    },
  });
  const AppendUserReq = useSWRMutation(`/participants`, appendUser);
  const UpdateUserReq = useSWRMutation(userData?.id ? `/participants?id=${userData.id}` : null, updateUser);
  const isLoading = methodForm.formState.isSubmitting || AppendUserReq?.isMutating || UpdateUserReq?.isMutating;

  const acceptItems = [
    { value: 'NO', label: 'Ko đi đc', icon: '😐' },
    { value: 'MAYBE', label: 'Có thể đi...', icon: '🤔' },
    { value: 'YES', label: 'YESSS', icon: '🎉' },
  ];
  const selectedAcceptItem = acceptItems.find((item) => item.value === methodForm.watch('accepted')) || acceptItems[2];

  const handleFire = () => {
    const scalar = 2;
    const triangle = confetti.shapeFromPath({
      path: 'M0 10 L5 0 L10 10z',
    });
    const square = confetti.shapeFromPath({
      path: 'M0 0 L10 0 L10 10 L0 10 Z',
    });
    const coin = confetti.shapeFromPath({
      path: 'M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z',
    });
    const tree = confetti.shapeFromPath({
      path: 'M5 0 L10 10 L0 10 Z',
    });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
      origin: { x: 0.5, y: 0.99 },
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ['circle'],
      });
    };

    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
  };

  const handleSubmitForm = methodForm.handleSubmit(async (formData) => {
    try {
      const { accepted, fullName, partyName, phoneNumber, invitedTime, partyDay } = formData;

      let res;

      setOpen(false);
      methodForm.reset();

      if (formData.accepted === 'YES') {
        handleFire();

        const mappedStartDate = dateFns.parse(`${partyDay} ${invitedTime}`, 'dd/MM/yyyy H:mm', new Date());
        const endDate = dateFns.add(mappedStartDate, { hours: 3 });
        const location = partyName == 'h' ? 'https://maps.app.goo.gl/gzs9MRd9NqgfZits7' : 'https://maps.app.goo.gl/gBg3rjwBqTo81Gkr5';
        downloadIcsFile({
          title: 'Lễ Cưới Việt Tùng & Thu Huyền',
          description: `Trân trọng kính mời bạn đến tham dự Lễ Thành Hôn của Việt Tùng và Thu Huyền tại ${partyName == 'h' ? 'Nhà Gái: Trống Đồng Place, 2 P. Lãng Yên, Hai Bà Trưng, Hà Nội' : 'Nhà Trai: Đội 5, Phú Thịnh, Kim Động, Hưng Yên'}. Sự hiện diện của bạn là niềm vui và vinh hạnh cho đôi uyên ương trong ngày trọng đại này.`,
          location: location,
          start: mappedStartDate,
          end: endDate,
        });
        toast.success(
          <div className="flex flex-col sm:w-[400px]">
            <div className="font-[600]">{`Your answer is "YES" 🎉`}</div>
            <div className="mb-1 text-sm leading-[1.2]">{`Thank youu${formData?.fullName ? ', ' + formData?.fullName : ''}! See you soon!`}</div>
          </div>,
        );
      } else if (formData.accepted === 'MAYBE') {
        toast.warn(
          <div className="flex flex-col">
            <div className="font-[600]">{`Your answer is "MAYBE" 🤔`}</div>
            <div className="text-sm">Hope to see you soon!</div>
          </div>,
        );
      } else {
        toast.warn(
          <div className="flex flex-col">
            <div className="font-[600]">{`Your answer is "NO" 😐`}</div>
            <div className="text-sm">{`:<<<`}</div>
          </div>,
        );
      }

      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => {
            if (userData?.id) {
              const path = `/${userData.partyName === 'h' ? 'l' : 'c'}/${userData.id}`;
              router.replace(path, path, { scroll: false });
            } else if (res?.data?.id) {
              const path = `/${res.data.partyName === 'h' ? 'l' : 'c'}/${res.data.id}`;
              router.replace(path, path, { scroll: false });
            }
            resolve(true);
          }, 500),
        ),
        {
          pending: 'Getting your invitation...',
        },
      );
    } catch (error) {
      console.log('error:', error);
    }
  });

  useEffect(() => {
    methodForm.reset({
      fullName: userData?.fullName || '',
      invitedTime: userData?.invitedTime || '',
      accepted: userData?.accepted || 'YES',
      partyName: pType || 't',
    });
  }, [userData]);

  return (
    <>
      <Modal open={open} className="max-sm:mt-auto md:max-w-[600px]" classNameCloseBtn="top-4 right-4" setOpen={setOpen}>
        <div className="flex items-center gap-4 bg-amber-50 p-4 pr-10 text-amber-500">
          <CalendarHeartIcon className="shrink-0" />
          <div className="-mb-1 flex items-baseline">
            <h4 className="mr-0.5 text-2xl leading-[1.1] font-bold">26</h4>
            <div className="leading-[1.1]">/11/2024</div>
          </div>
        </div>

        <div className="p-2 text-sm leading-[1.2] text-amber-500 uppercase sm:px-4 sm:pt-3 sm:pb-4 sm:text-base ">Hãy dành chút thời gian để nói cho chúng mình biết nhé!</div>

        <form style={{ scrollbarWidth: 'thin' }} className="relative flex min-h-0 flex-[1_1_auto] flex-col overflow-y-auto px-2 pt-0 sm:px-4 " onSubmit={handleSubmitForm}>
          {isLoading && (
            <div className="absolute top-0 left-0 z-50 flex size-full flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
              <CircleLoading className="size-10" />
            </div>
          )}
          <Controller
            name="fullName"
            control={methodForm.control}
            render={({ field }) => (
              <FormInputFloating
                label="Họ và tên *"
                name={field.name}
                autoComplete="off"
                disabled={!!pName}
                placeholder="Bạn ABC và ny..."
                required
                value={field.value}
                classNameWrapper="mb-4"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
            rules={{ required: true }}
          />

          <Controller
            name="phoneNumber"
            control={methodForm.control}
            render={({ field }) => (
              <FormInputFloating
                label="Số điện thoại"
                name={field.name}
                autoComplete="off"
                disabled={false}
                placeholder="84xxxyyyzzz"
                showCount
                type="tel"
                value={field.value}
                classNameWrapper="mb-4"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <div className="mb-4 flex flex-col">
            <div className="mb-2 leading-[1.2] text-amber-600 italic">Trân trọng kính mời bạn tham dự Bữa tiệc chung vui của gia đình chúng mình</div>
            {pType === 'h' ? (
              <>
                <div className="mb-1 flex items-baseline text-neutral-500">
                  <span>Tổ chức vào lúc</span>
                  <span className="ml-1 font-[600] ">{'17 giờ 00'}</span>
                </div>
                <div className="text-base ">Thứ Bảy, ngày 23 tháng 11 năm 2024</div>
                <div className="mb-2 text-base italic">{`(Tức ngày 23 tháng 10 năm 2024 Giáp Thìn)`}</div>

                <div className="text-base opacity-60">Tại gia đình Nhà Gái:</div>
                <div className="">Nhà văn hoá thôn Hà Lỗ, Thư Lâm, Hà Nội</div>
              </>
            ) : (
              <>
                <div className="mb-1 flex items-baseline text-neutral-500">
                  <span>Tổ chức vào lúc</span>
                  <span className="ml-1 font-[600] ">{pType === 't-31' ? `09 giờ 30` : '16 giờ 30'}</span>
                </div>
                {pType === 't-31' ? (
                  <>
                    <div className="text-base ">Thứ Bảy, ngày 31 tháng 01 năm 2026</div>
                    <div className="mb-2 text-base italic">{`(Tức ngày 13 tháng 12 năm Ất Tỵ)`}</div>
                  </>
                ) : (
                  <>
                    <div className="text-base ">Thứ Ba, ngày 30 tháng 01 năm 2026</div>
                    <div className="mb-2 text-base italic">{`(Tức ngày 12 tháng 12 năm Ất Tỵ)`}</div>
                  </>
                )}

                <div className="text-base opacity-60">Tại gia đình Nhà Trai:</div>
                <div className="">Ngõ cây xăng khu 6, Thuỵ Lôi, Thư Lâm, Hà Nội</div>
              </>
            )}
          </div>

          <div className="mb-1 font-[600] opacity-60">Bạn sẽ đến chứ? </div>
          <Controller
            name="accepted"
            control={methodForm.control}
            render={({ field }) => (
              <div className="mb-4 flex flex-nowrap justify-between gap-2 sm:gap-4 [&>*]:w-[33%]">
                {acceptItems.map((item, index) => (
                  <FormRadioBtn
                    key={uid + index + item.value}
                    name={field.name}
                    extra={field.value === item.value && <CheckIcon className="absolute top-2 right-2 size-5 fill-amber-50 text-amber-600" />}
                    value={item.value}
                    className={cn('flex-col items-stretch px-2 pt-4 pb-2', index === 2 && 'border-amber-200', field.value === item.value && 'border-amber-600')}
                    classNameWrapper="relative"
                    onChange={field.onChange}
                  >
                    <div className={cn('mb-1 flex h-9 items-center leading-none', index === 0 && 'text-2xl opacity-60', index === 1 && 'text-2xl', index === 2 && 'text-4xl')}>{item.icon}</div>
                    <div className={cn('mt-auto text-[17px] text-inherit', field.value === item.value && 'font-[600] text-amber-600')}>{item.label}</div>
                  </FormRadioBtn>
                ))}
              </div>
            )}
          />
          <div className="font-[600] opacity-60">Bạn là khách của?</div>
          <Controller
            name="partyName"
            control={methodForm.control}
            render={({ field }) => (
              <div className="mb-8 flex flex-nowrap justify-between gap-2 sm:gap-4 [&>*]:w-1/2">
                {[
                  {
                    value: 'h',
                    label: 'Nhà Trai',
                    icon1: '💍',
                    icon2: '💍',
                    className: 'border-slate-300',
                  },
                  {
                    value: 'h',
                    label: 'Nhà Gái',
                    icon1: '💐',
                    className: 'border-rose-300',
                  },
                ].map((item, index) => (
                  <FormRadioBtn
                    key={uid + index + item.value}
                    name={field.name}
                    disabled={item.value !== pType}
                    extra={
                      item.value === pType ? (
                        <CheckIcon className="absolute top-2 right-2 size-5 fill-amber-50 text-amber-600" />
                      ) : (
                        !!pName || (
                          <Link
                            to={(item.value === 'h' ? '/h#invitation' : '/t#invitation') as any}
                            className="absolute top-2 right-2 flex items-center text-gray-600 underline hover:text-amber-600"
                            onClick={() => setOpen?.(false)}
                          >
                            <span className="mr-1 text-xs">Xem thiệp mời</span>
                            <ArrowRightIcon className="size-5" />
                          </Link>
                        )
                      )
                    }
                    value={item.value}
                    className={cn('flex-col items-stretch px-2 pt-4 pb-2', item?.className, field.value === item.value && 'border-amber-600')}
                    classNameWrapper="relative"
                    onChange={field.onChange}
                  >
                    <div className={cn('relative mb-1 flex h-9 items-center text-4xl leading-none')}>
                      <span>{item.icon1}</span>
                      {!!item?.icon2 && <span className="absolute bottom-0 left-[30px] -mb-1 -ml-2 scale-90">{item.icon2}</span>}
                    </div>
                    <div className={cn('mt-auto text-[17px] text-inherit', field.value === item.value && 'font-[600] text-amber-600')}>{item.label}</div>
                  </FormRadioBtn>
                ))}
              </div>
            )}
          />

          <div className="sticky bottom-0 mt-auto flex flex-col bg-white pt-0.5 pb-2 sm:pb-4">
            {!!userData?.accepted && !!userData?.updatedAt && (
              <div className="mb-1 text-sm">
                <span className="font-[600] text-amber-600">{`"${userData?.accepted}"`}</span>
                <span className="mx-1 opacity-60">at</span>
                <span className="font-[600] opacity-60">{userData?.updatedAt}</span>
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="relative flex h-[60px] w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-amber-500/50 bg-amber-600/10 "
            >
              <span className="pointer-events-none text-xl font-[600] text-amber-600">{'Tham gia'}</span>
              <span className="ml-2 text-xl">{selectedAcceptItem.icon}</span>
              <BorderBeam delay={2} duration={6} size={100} />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAccept;
