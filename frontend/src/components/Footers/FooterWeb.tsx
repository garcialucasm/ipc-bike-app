function FooterWeb() {
  const currentYear: number = new Date().getFullYear()

  return (
    <>
      <footer className="mt-auto">
        <div className="text-center text-xs">
          &copy; {currentYear} IPC Bike. All Rights Reserved.
        </div>
      </footer>
    </>
  )
}

export default FooterWeb
