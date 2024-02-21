function FooterApp() {
  const currentYear: number = new Date().getFullYear()

  return (
    <>
      <footer className="mt-auto">
        <div className="text-center text-xs text-slate-600">
          &copy; {currentYear} IPC Bike. All Rights Reserved.
        </div>
      </footer>
    </>
  )
}

export default FooterApp
