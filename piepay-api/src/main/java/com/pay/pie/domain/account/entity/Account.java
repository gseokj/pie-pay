package com.pay.pie.domain.account.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;

	@NonNull
	@Column(name = "bank_code", nullable = false)
	private String bankCode;

	@NonNull
	@Column(name = "account_no", nullable = false, unique = true)
	private String accountNo;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "is_main_account")
	private boolean mainAccount;

	@Builder
	public Account(String bankCode, String accountNo, Member member, boolean isMainAccount) {
		this.bankCode = bankCode;
		this.accountNo = accountNo;
		this.member = linkMember(member);
		this.mainAccount = isMainAccount;
	}

	public Member linkMember(Member member) {
		this.member = member;
		member.getAccountList().add(this);
		return member;
	}

}
