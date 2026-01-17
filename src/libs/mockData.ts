// Vietnamese names for random generation
export const VIETNAMESE_NAMES = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Lê Văn Cường',
  'Phạm Thị Dung',
  'Hoàng Văn Em',
  'Vũ Thị Phương',
  'Đặng Văn Giang',
  'Bùi Thị Hương',
  'Đỗ Văn Inh',
  'Ngô Thị Kim',
  'Dương Văn Long',
  'Võ Thị Mai',
  'Phan Văn Nam',
  'Đinh Thị Oanh',
  'Lý Văn Phú',
  'Trương Thị Quỳnh',
  'Mai Văn Sơn',
  'Chu Thị Trang',
  'Tạ Văn Uy',
  'Hồ Thị Vân',
];

// Vietnamese wedding congratulation messages
export const VIETNAMESE_MESSAGES = [
  'Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!',
  'Chúc đôi bạn trẻ hạnh phúc bên nhau đến đầu bạc răng long!',
  'Chúc hai bạn luôn vui vẻ, hạnh phúc và yêu thương nhau mãi mãi!',
  'Chúc mừng đám cưới! Chúc cho tình yêu của hai bạn ngày càng thắm thiết!',
  'Chúc chú rể đẹp trai và cô dâu xinh đẹp hạnh phúc bên nhau!',
  'Chúc hai bạn sớm có tin vui, gia đình luôn ấm êm!',
  'Mừng ngày vui của hai bạn! Chúc bạn bè luôn đông, tiền bạc đầy túi!',
  'Chúc đôi uyên ương hạnh phúc, giàu có và thịnh vượng!',
  'Chúc mừng hai bạn! Hẹn sớm được ăn cỗ đầy tháng nhé!',
  'Trăm năm hạnh phúc! Chúc hai bạn yêu nhau đến muôn đời!',
  'Chúc mừng tân lang tân nương! Chúc luôn nắm tay nhau trong mọi hành trình!',
  'Hạnh phúc mãi bên nhau! Chúc hai bạn có một đám cưới thật ý nghĩa!',
  'Chúc hai bạn trẻ xây dựng tổ ấm hạnh phúc và ấm êm!',
  'Chúc đôi bạn trẻ luôn vui vẻ, hạnh phúc và thành công trong cuộc sống!',
  'Chúc mừng đám cưới! Chúc cho tình yêu của hai bạn mãi xanh tươi!',
  'Chúc hai bạn sống hạnh phúc, luôn có nhau trong mọi khoảnh khắc!',
  'Chúc mừng ngày vui! Chúc hai bạn mãi yêu nhau như thuở đầu!',
  'Trăm năm bên nhau! Chúc hai bạn có thật nhiều niềm vui!',
  'Chúc mừng hạnh phúc! Chúc gia đình hai bạn luôn ấm no, hạnh phúc!',
  'Chúc hai bạn có một cuộc sống hôn nhân ngọt ngào và đẹp đẽ!',
  'Chúc đôi uyên ương trăm năm hạnh phúc, vạn sự như ý!',
  'Chúc mừng hai bạn! Chúc tình yêu của hai bạn mãi mãi bền chặt!',
  'Hạnh phúc mãi về sau! Chúc hai bạn luôn hạnh phúc bên nhau!',
  'Chúc hai bạn có một gia đình hạnh phúc, ấm áp và nhiều yêu thương!',
  'Chúc mừng đám cưới! Chúc hai bạn luôn thủy chung với nhau!',
  'Chúc hai bạn trẻ sống hạnh phúc, yêu thương và che chở cho nhau!',
  'Chúc tân lang đẹp trai, cô dâu xinh xắn, trăm năm hạnh phúc!',
  'Chúc mừng hai bạn! Chúc cho hôn nhân của hai bạn luôn ngọt ngào!',
  'Chúc đôi bạn có một cuộc sống mới tràn đầy tiếng cười!',
  'Chúc mừng ngày vui! Chúc hai bạn mãi là chỗ dựa vững chắc cho nhau!',
];

export function getRandomVietnameseName(): string {
  return VIETNAMESE_NAMES[Math.floor(Math.random() * VIETNAMESE_NAMES.length)];
}

export function getRandomVietnameseMessage(): string {
  return VIETNAMESE_MESSAGES[Math.floor(Math.random() * VIETNAMESE_MESSAGES.length)];
}

export interface MockComment {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  createdAt: Date;
}

// Generate mock comments for initial data
export function generateMockComments(count: number = 5): MockComment[] {
  const mockComments: MockComment[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const timeAgo = Math.floor(Math.random() * 3600000); // Random time within last hour
    mockComments.push({
      id: `mock-${i}-${now}`,
      userId: `user-mock-${i}`,
      userName: getRandomVietnameseName(),
      message: getRandomVietnameseMessage(),
      timestamp: new Date(now - timeAgo),
      createdAt: new Date(now - timeAgo),
    });
  }

  return mockComments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}
