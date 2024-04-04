package com.pay.pie.domain.member.entity;

import java.util.ArrayList;
import java.util.List;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.member.dto.UpdateMemberRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "member")
public class Member extends BaseEntity {

	@Id
	@Column(name = "member_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(max = 255)
	@Column(name = "pay_password")
	private String payPassword;

	@Size(max = 11)
	@Column(name = "phone_number", length = 11)
	private String phoneNumber;

	@Size(max = 30)
	@NotNull
	@Column(name = "nickname", nullable = false, length = 30)
	private String nickname;

	@Size(max = 255)
	@Column(name = "profile_image", length = 255)
	private String profileImage;

	@Size(max = 30)
	@NotNull
	@Column(name = "email", nullable = false, length = 30)
	private String email;

	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

	@Column(name = "api_key")
	private String apiKey;

	@OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
	List<Account> accountList = new ArrayList<>();

	@OneToMany(mappedBy = "member" , fetch = FetchType.LAZY)
	List<MemberMeet> memberMeetList = new ArrayList<>();


	public void registerPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void registerPaymentPassword(String paymentPassword) {
		this.payPassword = paymentPassword;
		finishVerify();
	}

	// 모든 인증이 끝나고 권한을 변경
	private void finishVerify() {
		this.memberRole = MemberRole.ROLE_CERTIFIED_MEMBER;
	}

	@Builder(builderMethodName = "of")
	public Member(String nickname, String profileImage, String email, MemberRole memberRole, String apiKey) {
		this.nickname = nickname;
		this.profileImage = profileImage;
		this.email = email;
		this.memberRole = memberRole;
		this.apiKey = apiKey;
	}

	public void updateMember(UpdateMemberRequest request) {
		this.nickname = request.getNickname();
	}

	public void updateMemberProfileImage(String imageUrl) {
		this.profileImage = imageUrl;
	}
}